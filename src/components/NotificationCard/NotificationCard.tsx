import { INotification } from '../../interfaces/INotification';
import { DeleteButton, Div } from './styled';
import { Trash } from 'lucide-react';

type NotificationCardProps = {
  notification: INotification;
};

function NotificationCard({ notification }: NotificationCardProps) {
  return (
    <Div>
      <p>{notification.content}</p>
      <DeleteButton>
        <Trash />
      </DeleteButton>
    </Div>
  );
}

export default NotificationCard;
