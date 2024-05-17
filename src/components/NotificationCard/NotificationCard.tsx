import { DeleteButton, Div } from './styled';
import { Trash } from 'lucide-react';

function NotificationCard() {
  return (
    <Div>
      <p>Você recebeu um pedido de amizade de username201</p>
      <DeleteButton>
        <Trash />
      </DeleteButton>
    </Div>
  );
}

export default NotificationCard;
