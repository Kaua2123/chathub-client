import { useEffect, useState } from 'react';
import {
  ArrowLeftIcon,
  Button,
  Container,
  Div,
  DivConfig,
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
  const [socketInstance] = useState(socket());
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // sempre que chegar uma mensagem, esse evento é chamado
    socketInstance.on('msg', (msg: string) => {
      console.log('Msg sent:', msg);
    });
  });

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
          <p>username user_id: {id}</p>
        </DivUser>
        <DivConfig>
          <TrashIcon onClick={() => setIsDeleting(true)} />
        </DivConfig>
      </TopContainer>

      <Container>
        <Div>
          <Input type="text" placeholder="Envie algo" />

          <Button>
            <SendHorizontalIcon color="black" />
          </Button>
        </Div>
      </Container>
    </div>
  );
}

export default Chat;
