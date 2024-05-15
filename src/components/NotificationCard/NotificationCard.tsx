import { useSortable } from '@dnd-kit/sortable';
import { DeleteButton, Div } from './styled';
import { CSS } from '@dnd-kit/utilities';
import { Trash } from 'lucide-react';

export type NotificationCardProps = {
  id: number;
};

function NotificationCard({ id }: NotificationCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>Você recebeu um pedido de amizade de username201</p>
      <DeleteButton>
        <Trash />
      </DeleteButton>
    </Div>
  );
}

export default NotificationCard;
