import { User } from 'lucide-react';
import { UserAvatar } from './styled';
import {
  Container,
  DivConfig,
  DivUser,
  EllipsisVerticalIcon,
  UserNameAndMessage,
} from './styled';
import { useNavigate } from 'react-router-dom';

export type ConversationCardProps = {
  id: number;
};

function ConversationCard({ id }: ConversationCardProps) {
  const navigate = useNavigate();

  return (
    <div>
      <Container
        onClick={() => {
          navigate(`/conversation/${id}`);
        }}
      >
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserNameAndMessage>
            <p className="username">username</p>
            <p className="user-message">Mensagem do usuário...</p>
          </UserNameAndMessage>
        </DivUser>
        <DivConfig>
          <EllipsisVerticalIcon />
        </DivConfig>
      </Container>
    </div>
  );
}

export default ConversationCard;
