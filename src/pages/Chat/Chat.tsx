import { useEffect, useRef, useState } from 'react';
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
import { IOnlineUsers } from '../../interfaces/IOnlineUsers';
import { socket } from '../../socket';
import { useAuthContext } from '../../contexts/context';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import axios from '../../services/axios';

function Chat() {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const decodedToken = useAuthContext();

  const [socketInstance] = useState(socket);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [msg, setMsg] = useState<string | boolean>('');
  const [recipientId, setRecipientId] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUsers[]>([]);

  const isOnline = onlineUsers.some((user) => user.userId === recipientId);
  const divMessages = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.on('receivedMsg', (objMsg: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, objMsg]);
    });

    socketInstance.on('userTyping', (isTyping: boolean) => {
      setIsUserTyping(isTyping);
    });

    socketInstance.emit('newUser', decodedToken.id);
    socketInstance.on('onlineUsers', (onlineUsers) => {
      console.log('onlineUsers ', onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socketInstance.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
      socketInstance.off('userTyping');
      socketInstance.off('onlineUsers');
    };
  }, [socketInstance]);

  useEffect(() => {
    if (!socketInstance) return;
    msg
      ? socketInstance.emit('typing', true)
      : socketInstance.emit('typing', false);
  }, [msg]);

  useEffect(() => {
    if (!divMessages.current) return;

    divMessages.current.scrollTo(0, divMessages.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        const response = await axios.get(
          `/conversation/show/${decodedToken.id}/${id}`,
        );

        response.data[0].Users[0].users_conversations.UserId !== decodedToken.id
          ? setRecipientId(response.data[0].Users[0].users_conversations.UserId)
          : setRecipientId(
              response.data[0].Users[1].users_conversations.UserId,
            );
      } catch (error) {
        console.log(error);
      }
    };

    const getMessagesOfAConversation = async () => {
      try {
        const response = await axios.get(`/messages/getMessages/${id}`);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessagesOfAConversation();
    getRecipientId();
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (!msg || !socketInstance) return;
      const input: HTMLInputElement | null = document.querySelector('.input');

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        ConversationId: id,
        UserId: decodedToken.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      socketInstance.emit('msg', objMsg);

      if (input) input.value = '';

      setMsg(false);
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
                fill={isOnline ? '#629B44' : 'gray'}
              />
              <p className="is-online" style={{ fontSize: '1.4rem' }}>
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        </DivUser>

        <DivConfig>
          <TrashIcon onClick={() => setIsDeleting(true)} />
        </DivConfig>
      </TopContainer>

      <DivMessages ref={divMessages}>
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
