import { Link, useLocation } from 'react-router-dom';
import {
  CircleIcon,
  Div,
  DivRoute,
  MessageSquareTextIcon,
  UserRoundXIcon,
  UsersIcon,
} from './styled';

function BottomMenu() {
  const local = useLocation();

  return (
    <div>
      <Div>
        <DivRoute>
          <Link className="link" to={'/conversations'}>
            <MessageSquareTextIcon color="white" />
          </Link>
          {local.pathname == '/conversations' && (
            <CircleIcon color="inherit" size={15} fill="#4299E1" />
          )}
        </DivRoute>

        <DivRoute>
          <Link className="link" to={'/friends'}>
            <UsersIcon color="white" />
          </Link>
          {local.pathname == '/friends' && (
            <CircleIcon color="inherit" size={15} fill="#4299E1" />
          )}
        </DivRoute>

        <DivRoute>
          <Link className="link" to={'/blockedUsers'}>
            <UserRoundXIcon color="white" />
          </Link>
          {local.pathname == '/blockedUsers' && (
            <CircleIcon color="inherit" size={15} fill="#4299E1" />
          )}
        </DivRoute>
      </Div>
    </div>
  );
}

export default BottomMenu;
