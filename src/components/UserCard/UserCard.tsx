import { Circle, User } from 'lucide-react';
import {
  BanIcon,
  Button,
  Div,
  DivIsOnline,
  DivOptions,
  DivUser,
  MessageSquareTextIcon,
  UserAvatar,
  UserData,
  UserImage,
  UserRoundPlusIcon,
  UserRoundXIcon,
} from './styled';
import { IUser } from '../../interfaces/IUser';
import axios from '../../services/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';
import ModalDeleting from '../ModalDeleting/ModalDeleting';

export type UserCardProps = {
  user: IUser;
  isGroup?: boolean;
  conversationId: string | undefined;
};

function UserCard({ user, isGroup, conversationId }: UserCardProps) {
  const navigate = useNavigate();
  const decodedToken = useAuthContext();
  const [isRemovingUser, setIsRemovingUser] = useState(false);
  const [isBlockingUser, setIsBlockingUser] = useState(false);

  const sendFriendRequest = async () => {
    try {
      await axios.post('/friendRequest/create', {
        senderId: decodedToken?.id,
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
        `/conversation/create/${decodedToken?.id}/${user.id}`,
      );

      navigate(`/chat/${response.data.conversation.id}/${user.username}`);

      toast.success(`Você iniciou uma conversa com ${user.username}`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const removeUserFromConversation = async () => {
    try {
      await axios.delete(
        `/conversation/removeUsersFromConversation/${conversationId}/${user.id}`,
      );

      toast.success('Usuário removido do grupo.');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const blockUser = async () => {
    try {
      await axios.post(`/blockedUsers/blockUser/${user.id}`, {
        user_who_blocked_id: decodedToken?.id,
      });

      toast.success(`Você bloqueou ${user.username}`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
      {isBlockingUser && (
        <ModalDeleting
          handleClickDelete={blockUser}
          setIsDeleting={setIsBlockingUser}
        />
      )}
      <Div>
        <DivUser>
          {user.image ? (
            <UserImage>
              <img src={user.image_url} />
            </UserImage>
          ) : (
            <UserAvatar>
              <User color="black" />
            </UserAvatar>
          )}

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
          {isGroup ? (
            <>
              <Button onClick={() => setIsRemovingUser(true)}>
                <UserRoundXIcon />
              </Button>
              {isRemovingUser && (
                <ModalDeleting
                  handleClickDelete={removeUserFromConversation}
                  setIsDeleting={setIsRemovingUser}
                />
              )}
            </>
          ) : (
            <>
              <Button>
                <MessageSquareTextIcon
                  onClick={handleClickConversation}
                  size={28}
                />
              </Button>
              <Button onClick={sendFriendRequest}>
                <UserRoundPlusIcon size={28} />
              </Button>
              <Button onClick={() => setIsBlockingUser(true)}>
                <BanIcon size={28} />
              </Button>
            </>
          )}
        </DivOptions>
      </Div>
    </div>
  );
}

export default UserCard;
