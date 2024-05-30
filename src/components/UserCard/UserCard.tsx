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
import axios from '../../services/axios';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../../interfaces/IToken';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export type UserCardProps = {
  user: IUser;
};

function UserCard({ user }: UserCardProps) {
  const token = localStorage.getItem('token');
  const decodedToken: IToken = jwtDecode(token as string);
  const navigate = useNavigate();

  const sendFriendRequest = async () => {
    try {
      await axios.post('/friendRequest/create', {
        senderId: decodedToken.id,
        receiverId: user.id,
      });

      toast.success(`Você enviou um pedido de amizade à ${user.username}`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleClickConversation = async () => {
    try {
      const response = await axios.post(
        `/conversation/create/${decodedToken.id}/${user.id}`,
      );

      navigate(`/chat/${response.data.conversation.id}/${user.username}`);

      toast.success(`Você iniciou uma conversa com ${user.username}`);
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
            <MessageSquareTextIcon
              onClick={handleClickConversation}
              size={28}
            />
          </Button>
          <Button onClick={sendFriendRequest}>
            <UserRoundPlusIcon size={28} />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default UserCard;
