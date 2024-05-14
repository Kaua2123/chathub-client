import { useSortable } from '@dnd-kit/sortable';
import { Div } from './styled';
import { CSS } from '@dnd-kit/utilities';

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
      Você recebeu um pedido de amizade de username201
    </Div>
  );
}

export default NotificationCard;
