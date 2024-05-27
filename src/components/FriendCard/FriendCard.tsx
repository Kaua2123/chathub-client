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
  XIcon,
} from './styled';
import { useState } from 'react';

import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import { IFriend } from '../../interfaces/IFriend';

export type FriendCardProps = {
  friend: IFriend;
};

function FriendCard({ friend }: FriendCardProps) {
  const [isOnline] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div>
      {isDeleting && <ModalDeleting setIsDeleting={setIsDeleting} />}
      <Div>
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserData>
            <p className="username">{friend.username}</p>
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
            <XIcon size={28} onClick={() => setIsDeleting(true)} />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default FriendCard;
