import { Link } from 'react-router-dom';
import {
  Div,
  MessageSquareTextIcon,
  SettingsIcon,
  UserRoundXIcon,
  UsersIcon,
} from './styled';

function BottomMenu() {
  return (
    <div>
      <Div>
        <Link to={'#'}>
          <MessageSquareTextIcon color="white" />
        </Link>
        <Link to={'#'}>
          <UsersIcon color="white" />
        </Link>
        <Link to={'#'}>
          <UserRoundXIcon color="white" />
        </Link>
        <Link to={'#'}>
          <SettingsIcon color="white" />
        </Link>
      </Div>
    </div>
  );
}

export default BottomMenu;
