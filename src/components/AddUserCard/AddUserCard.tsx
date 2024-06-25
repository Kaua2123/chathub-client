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
} from './styled';

import { IFriend } from '../../interfaces/IFriend';

export type AddUserCardProps = {
  friend: IFriend;
};

function AddUserCard({ friend }: AddUserCardProps) {
  // const handleClickConversation = async () => {
  //   try {
  //     const response = await axios.post(
  //       `/conversation/create/${decodedToken?.id}/${friend.id}`,
  //     );

  //     navigate(`/chat/${response.data.conversation.id}/${friend.username}`);
  //     toast.success(`Você iniciou uma conversa com ${friend.username}`);
  //   } catch (error) {
  //     if (error instanceof AxiosError)
  //       toast.error(error.response?.data.message);
  //   }
  // };

  return (
    <div>
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
            <CirclePlusIcon
              size={28}
              // onClick={handleClickConversation}
            />
          </Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default AddUserCard;
