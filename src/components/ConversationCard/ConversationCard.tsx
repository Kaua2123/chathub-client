import { User } from 'lucide-react';
import { UserAvatar } from './styled';
import {
  Container,
  DivConfig,
  DivUser,
  EllipsisVerticalIcon,
  UserNameAndMessage,
} from './styled';

function ConversationCard() {
  return (
    <div>
      <Container>
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
