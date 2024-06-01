import { useEffect, useState } from 'react';
import {
  ArrowLeftIcon,
  Button,
  Container,
  Div,
  DivConfig,
  DivMessages,
  DivUser,
  Input,
  SendHorizontalIcon,
  TopContainer,
  TrashIcon,
  UserAvatar,
} from './styled';
import { Circle, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { IMessage } from '../../interfaces/IMessage';
import { socket } from '../../socket';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import axios from '../../services/axios';
import { tokenDecoder } from '../../utils/tokenDecoder';

function Chat() {
  const { id, username } = useParams();
  const [socketInstance] = useState(socket);
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [msg, setMsg] = useState<string | boolean>('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  const token = localStorage.getItem('token');
  const decodedToken = tokenDecoder(token);

  useEffect(() => {
    const getMessagesOfAConversation = async () => {
      const response = await axios.get(`/messages/getMessages/${id}`);
      setMessages(response.data);
    };

    getMessagesOfAConversation();
  }, [id]);

  useEffect(() => {
    socketInstance.on('receivedMsg', (objMsg: IMessage) => {
      setMessages([...messages, objMsg]);
    });

    socketInstance.on('userTyping', (isTyping: boolean) => {
      isTyping ? setIsUserTyping(true) : setIsUserTyping(false);
    });

    socketInstance.on('userOnline', (isOnline: boolean) => {
      isOnline ? setIsUserOnline(true) : setIsUserOnline(false);
    });

    return () => {
      socketInstance.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
    };
  });

  useEffect(() => {
    token ? socket.emit('isOnline', true) : socket.emit('isOnline', false);
  }, [token]);

  useEffect(() => {
    msg ? socket.emit('typing', true) : socket.emit('typing', false);
  }, [msg]);

  const handleSubmit = async () => {
    try {
      if (!msg) return;
      const input: HTMLInputElement | null = document.querySelector('.input');
      const divMessages: HTMLDivElement | null =
        document.querySelector('.div-messages');

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        ConversationId: id,
        UserId: decodedToken?.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      socketInstance.emit('msg', objMsg);

      divMessages ? divMessages.scrollTo(0, divMessages.scrollHeight) : '';
      setMsg(false);
      input ? (input.value = '') : '';
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClickDelete = async () => {
    try {
      await axios.delete(`/conversation/delete/${id}`);

      localStorage.removeItem('conversations');
      navigate('/conversations');

      toast.success(`Você deletou essa conversa.`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
      {isDeleting && (
        <ModalDeleting
          handleClickDelete={handleClickDelete}
          setIsDeleting={setIsDeleting}
        />
      )}
      <TopContainer>
        <DivUser>
          <ArrowLeftIcon
            onClick={() => {
              navigate('/conversations');
            }}
          />
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
            <p>{username}</p>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Circle
                size={16}
                color="inherit"
                fill={isUserOnline ? '#629B44' : 'gray'}
              />
              <p className="is-online" style={{ fontSize: '1.4rem' }}>
                {isUserOnline ? 'Online' : 'Offline'}
              </p>
            </div>

            {/* {socketInstance ? <p>Online</p> : <p>Offline</p>} */}
          </div>
        </DivUser>

        <DivConfig>
          <TrashIcon onClick={() => setIsDeleting(true)} />
        </DivConfig>
      </TopContainer>

      <DivMessages className="div-messages">
        {messages.map((message, index) => (
          <Message
            id={message.id}
            key={index}
            isUpdated={message.is_updated}
            isSender={
              decodedToken?.id == message.UserId
                ? message.is_sender
                : !message.is_sender
            }
          >
            {message.content}
          </Message>
        ))}
      </DivMessages>

      <Container>
        {isUserTyping && (
          <p className="is-typing">
            <b>{username}</b> está digitando...
          </p>
        )}
        <Div>
          <Input
            className="input"
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Envie algo"
            onKeyDown={(e) => handleKeyPress(e)}
          />

          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            <SendHorizontalIcon color="black" />
          </Button>
        </Div>
      </Container>
    </div>
  );
}

export default Chat;
