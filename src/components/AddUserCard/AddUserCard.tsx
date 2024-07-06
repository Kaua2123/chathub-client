import { Circle, User } from 'lucide-react';
import {
  Button,
  CirclePlusIcon,
  Div,
  DivIsOnline,
  DivOptions,
  DivUser,
  UserAvatar,
  UserData,
  UserImage,
} from './styled';

import { IFriend } from '../../interfaces/IFriend';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import axios from '../../services/axios';

export type AddUserCardProps = {
  friend: IFriend;
  conversationId: string | undefined;
};

function AddUserCard({ friend, conversationId }: AddUserCardProps) {
  const addMoreUsersToConversation = async () => {
    try {
      await axios.post(
        `/conversation/addMoreUsersToConversation/${conversationId}/${friend.id}`,
      );

      toast.success(`Você adicionou ${friend.username} ao grupo.`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
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
            <CirclePlusIcon size={28} onClick={addMoreUsersToConversation} />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default AddUserCard;
