import { Link } from 'react-router-dom';
import {
  Div,
  MessageSquareTextIcon,
  UserRoundXIcon,
  UsersIcon,
} from './styled';

function BottomMenu() {
  return (
    <div>
      <Div>
        <Link to={'/conversations'}>
          <MessageSquareTextIcon color="white" />
        </Link>
        <Link to={'/friends'}>
          <UsersIcon color="white" />
        </Link>
        <Link to={'/blockedUsers'}>
          <UserRoundXIcon color="white" />
        </Link>
      </Div>
    </div>
  );
}

export default BottomMenu;
