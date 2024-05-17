import { Circle, User } from 'lucide-react';
import {
  Button,
  Div,
  DivIsOnline,
  DivOptions,
  DivUser,
  UserAvatar,
  UserData,
} from './styled';
import { useState } from 'react';

function BlockedUserCard() {
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
          <Button>Desbloquear</Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default BlockedUserCard;
