import { KeyboardEvent, useEffect, useState } from 'react';
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
import { User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

import { IToken } from '../../interfaces/IToken';
import { jwtDecode } from 'jwt-decode';
import { IMessage } from '../../interfaces/IMessage';
import { socket } from '../../socket';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import axios from '../../services/axios';

function Chat() {
  const { id, username } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socketInstance] = useState(socket);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const decodedToken: IToken = jwtDecode(token as string);

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

    return () => {
      socketInstance.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
    };
  });

  const handleSubmit = async () => {
    try {
      if (!msg) return;

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        ConversationId: id,
        UserId: decodedToken.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      socketInstance.emit('msg', objMsg);
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
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
            {socketInstance ? <p>Online</p> : <p>Offline</p>}
          </div>
        </DivUser>
        <DivConfig>
          <TrashIcon onClick={() => setIsDeleting(true)} />
        </DivConfig>
      </TopContainer>

      <DivMessages>
        {messages.map((message, index) => (
          <Message
            key={index}
            isSender={
              decodedToken.id == message.UserId
                ? message.is_sender
                : !message.is_sender
            }
          >
            {message.content}
          </Message>
        ))}
      </DivMessages>

      <Container>
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
