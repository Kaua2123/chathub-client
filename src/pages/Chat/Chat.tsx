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
import { socket } from '../../socket';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import { User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

function Chat() {
  const { id } = useParams();
  const [socketInstance] = useState(socket);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socketInstance.on('msg', (msg, socket) => {
      const messages = document.querySelector('.messages');
      const item = document.createElement('li');
      item.textContent = `${socket} digitou: ${msg} `;
      messages ? messages.appendChild(item) : '';
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socketInstance.off('msg'); // desligando a conexão quando o componente for desmontado
    };
  });

  const handleSubmit = () => {
    socketInstance.emit('msg', msg, id);
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
        <ul
          className="messages"
          style={{ color: 'white', fontFamily: 'Raleway', fontSize: '2rem' }}
        ></ul>
      </DivMessages>

      <Container>
        <Div>
          <Input
            className="input"
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Envie algo"
          />

          <Button onClick={handleSubmit}>
            <SendHorizontalIcon color="black" />
          </Button>
        </Div>
      </Container>
    </div>
  );
}

export default Chat;
