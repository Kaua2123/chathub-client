import { Circle, User } from 'lucide-react';
import {
  Button,
  CircleCheckIcon,
  CircleXIcon,
  Div,
  DivIsOnline,
  DivOptions,
  DivUser,
  UserAvatar,
  UserData,
} from './styled';
import { useState } from 'react';

function FriendRequestCard() {
  const [isOnline] = useState(false);

  return (
    <div>
      <Div>
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserData>
            <p className="username">Username</p>
            <DivIsOnline>
              <Circle
                size={16}
                color="inherit"
                fill={isOnline ? 'green' : 'gray'}
              />
              <p className="is-online">{isOnline ? 'Online' : 'Offline'}</p>
            </DivIsOnline>
          </UserData>
        </DivUser>
        <DivOptions>
          <Button>
            <CircleCheckIcon size={28} />
          </Button>
          <Button>
            <CircleXIcon size={28} />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default FriendRequestCard;
