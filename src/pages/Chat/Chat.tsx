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

function Chat() {
  const { id } = useParams();
  const [socketInstance] = useState(socket);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    socketInstance.on('msg', (msg, socket) => {
      socket == socketInstance.id ? setIsSender(true) : setIsSender(false);

      setMessages([...messages, msg]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socketInstance.off('msg'); // desligando a conexão quando o componente for desmontado
    };
  });

  const handleSubmit = () => {
    socketInstance.emit('msg', msg /*id*/); // envia a mensagem. emite a chamada ao canal msg
    setIsSender(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div>
      {isDeleting && <ModalDeleting setIsDeleting={setIsDeleting} />}
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
          <p>username chat_id: {id}</p>
        </DivUser>
        <DivConfig>
          <TrashIcon onClick={() => setIsDeleting(true)} />
        </DivConfig>
      </TopContainer>

      <DivMessages>
        {messages.map((message, index) => (
          <Message key={index} isSender={isSender}>
            {message}
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
