import { User } from 'lucide-react';
import {
  ArrowLeftIcon,
  Container,
  DivConfig,
  DivUser,
  TrashIcon,
  UserAvatar,
} from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import ModalDeleting from '../ModalDeleting/ModalDeleting';

function ChatBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      {isDeleting && <ModalDeleting setIsDeleting={setIsDeleting} />}
      <Container>
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
      </Container>
    </div>
  );
}

export default ChatBar;
