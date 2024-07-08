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
import { IBlockedUser } from '../../interfaces/IBlockedUser';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import axios from '../../services/axios';

type BlockedUserCardProps = {
  blockedUser: IBlockedUser;
};

function BlockedUserCard({ blockedUser }: BlockedUserCardProps) {
  const unblockUser = async () => {
    try {
      await axios.delete(`blockedUsers/unblockUser/${blockedUser.UserId}`);
      setTimeout(() => {
        window.location.reload();
      }, 900);

      toast.success('Usuário desbloqueado.');
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
            <p className="username">
              {blockedUser ? blockedUser.User.username : 'username'}
            </p>
            <DivIsOnline>
              <Circle
                size={16}
                color="inherit"
                // fill={isOnline ? 'green' : 'gray'}
              />
              <p className="is-online">
                Offline
                {/* isOnline ? 'Online' :  'Offline' */}
              </p>
            </DivIsOnline>
          </UserData>
        </DivUser>
        <DivOptions>
          <Button onClick={unblockUser}>Desbloquear</Button>
        </DivOptions>
      </Div>
    </div>
  );
}

export default BlockedUserCard;
