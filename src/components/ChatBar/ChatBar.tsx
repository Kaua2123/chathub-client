import { User } from 'lucide-react';
import {
  ArrowLeftIcon,
  Container,
  DivConfig,
  DivUser,
  EllipsisVerticalIcon,
  UserAvatar,
} from './styled';
import { useNavigate, useParams } from 'react-router-dom';

function ChatBar() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
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
          <EllipsisVerticalIcon />
        </DivConfig>
      </Container>
    </div>
  );
}

export default ChatBar;
