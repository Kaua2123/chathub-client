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
import { useEffect, useState } from 'react';
import { IFriendRequest } from '../../interfaces/IFriendRequest';
import axios from '../../services/axios';
import { IUser } from '../../interfaces/IUser';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export type FriendRequestCardProps = {
  friendRequest: IFriendRequest;
};

function FriendRequestCard({ friendRequest }: FriendRequestCardProps) {
  const [isOnline, setIsOnline] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`/user/${friendRequest.senderId}`);

        const user: IUser = response.data;
        setUsername(user.username);
        setIsOnline(user.is_online);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [friendRequest.senderId]);

  const handleClickAccept = async () => {
    try {
      await axios.post(
        `/friendRequest/acceptFriendRequest/${friendRequest.id}`,
      );

      toast.success(
        `Pedido de amizade aceito. Agora você e <b>${username}</b> são amigos.`,
      );
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
      <Div>
        <DivUser>
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          <UserData>
            <p className="username">{username}</p>
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
          <Button onClick={handleClickAccept}>
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
