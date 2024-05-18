import { Circle, User } from 'lucide-react';
import {
  Button,
  Div,
  DivIsOnline,
  DivOptions,
  DivUser,
  MessageSquareTextIcon,
  UserAvatar,
  UserData,
  UserRoundPlusIcon,
} from './styled';
import { useState } from 'react';

function UserCard() {
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
            <MessageSquareTextIcon size={28} />
          </Button>
          <Button>
            <UserRoundPlusIcon size={28} />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default UserCard;
