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
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type ConversationCardProps = {
  id: number;
};

function ConversationCard({ id }: ConversationCardProps) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Container
        onClick={() => {
          navigate(`/chat/${id}`);
        }}
      >
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserNameAndMessage>
            <p className="username">username ${id} </p>
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
