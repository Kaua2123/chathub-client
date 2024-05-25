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
import { IUser } from '../../interfaces/IUser';

export type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <Div>
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserData>
            <p className="username">{user.username}</p>
            <DivIsOnline>
              <Circle
                size={16}
                color="inherit"
                fill={user.is_online ? 'green' : 'gray'}
              />
              <p className="is-online">
                {user.is_online ? 'Online' : 'Offline'}
              </p>
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
