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
import { socket } from '../../socket';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import { User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import axios from '../../services/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { IToken } from '../../interfaces/IToken';
import { jwtDecode } from 'jwt-decode';
import { IMessage } from '../../interfaces/IMessage';

function Chat() {
  const { id, username } = useParams();
  const [socketInstance] = useState(socket);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

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
    socketInstance.on('msg', (objMsg: IMessage) => {
      setMessages([...messages, objMsg]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socketInstance.off('msg'); // desligando a conexão quando o componente for desmontado
    };
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/messages/create', {
        content: msg,
        ConversationId: id,
        UserId: decodedToken.id,
      });

      const objMsg = response.data;
      socketInstance.emit('msg', objMsg /*id*/); // envia a mensagem. emite a chamada ao canal msg
      setMessages([...messages, objMsg]);
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
          <Message key={index} isSender>
            {`${socketInstance.id} digitou ${message.content}`}
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
