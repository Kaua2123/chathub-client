import { User } from 'lucide-react';
import { TrashIcon, UserAvatar } from './styled';
import { Container, DivConfig, DivUser, UserNameAndMessage } from './styled';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export type ConversationCardProps = {
  id: number;
  isDragging: boolean;
};

function ConversationCard({ id, isDragging }: ConversationCardProps) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {isDragging ? (
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
              <TrashIcon />
            </DivConfig>
          </Container>
        </div>
      ) : (
        <div>
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
              <TrashIcon />
            </DivConfig>
          </Container>
        </div>
      )}
    </>
  );
}

export default ConversationCard;
