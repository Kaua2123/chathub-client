import { toast } from 'sonner';
import { INotification } from '../../interfaces/INotification';
import axios from '../../services/axios';
import { DeleteButton, Div } from './styled';
import { Trash } from 'lucide-react';

type NotificationCardProps = {
  notification: INotification;
};

function NotificationCard({ notification }: NotificationCardProps) {
  const deleteNotification = async () => {
    try {
      await axios.delete(`notifications/delete/${notification.id}`);

      toast.success('Notificação deletada.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Div>
      <p>{notification.content}</p>
      <DeleteButton onClick={deleteNotification}>
        <Trash />
      </DeleteButton>
    </Div>
  );
}

export default NotificationCard;
