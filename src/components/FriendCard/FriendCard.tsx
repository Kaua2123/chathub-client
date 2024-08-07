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
  UserImage,
  XIcon,
} from './styled';
import { useState } from 'react';

import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import { IFriend } from '../../interfaces/IFriend';
import axios from '../../services/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export type FriendCardProps = {
  friend: IFriend;
};

function FriendCard({ friend }: FriendCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const decodedToken = useAuthContext();

  const handleClickDelete = async () => {
    try {
      await axios.delete(
        `/user/removeFriends/${decodedToken?.id}/${friend.id}`,
      );

      toast.success(`Você removeu ${friend.username} da lista de amigos.`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleClickConversation = async () => {
    try {
      const response = await axios.post(
        `/conversation/create/${decodedToken?.id}/${friend.id}`,
      );

      navigate(`/chat/${response.data.conversation.id}/${friend.username}`);
      toast.success(`Você iniciou uma conversa com ${friend.username}`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
      {isDeleting && (
        <ModalDeleting
          setIsDeleting={setIsDeleting}
          handleClickDelete={handleClickDelete}
        />
      )}
      <Div>
        <DivUser>
          {friend.image ? (
            <UserImage>
              <img src={friend.image_url} alt="" />
            </UserImage>
          ) : (
            <UserAvatar>
              <User color="black" />
            </UserAvatar>
          )}

          <UserData>
            <p className="username">{friend.username}</p>
            <DivIsOnline>
              <Circle
                size={16}
                color="inherit"
                fill={friend.is_online ? 'green' : 'gray'}
              />
              <p className="is-online">
                {friend.is_online ? 'Online' : 'Offline'}
              </p>
            </DivIsOnline>
          </UserData>
        </DivUser>
        <DivOptions>
          <Button>
            <MessageSquareTextIcon
              size={28}
              onClick={handleClickConversation}
            />
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
