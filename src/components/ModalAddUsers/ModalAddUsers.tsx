import {
  CircleXIcon,
  CloseButton,
  Container,
  DivFriends,
  Modal,
} from './styled';
import { useEffect, useState } from 'react';
import { IFriend } from '../../interfaces/IFriend';
import { IToken } from 'jwt-decode';
import axios from '../../services/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import AddUserCard from '../AddUserCard/AddUserCard';

export type ModalAddUsersProps = {
  conversationId: string | undefined;
  setIsCreatingGroup: React.Dispatch<React.SetStateAction<boolean>>;
  decodedToken: IToken | undefined;
};

function ModalAddUsers({
  conversationId,
  setIsCreatingGroup,
  decodedToken,
}: ModalAddUsersProps) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsCreatingGroup(false);
    }
  };

  const [friends, setFriends] = useState<IFriend[]>([]);
  const [hasFriends, setHasFriends] = useState(false);

  useEffect(() => {
    const getUserFriends = async () => {
      try {
        const response = await axios.get(
          `/user/getUserFriends/${decodedToken?.id}`,
        );

        setFriends(response.data);
        if (response.data.length > 0) setHasFriends(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    };

    getUserFriends();
  }, []);

  return (
    <div>
      <Modal id="modal" onClick={handleOutsideClick}>
        <Container>
          <CloseButton>
            <CircleXIcon
              onClick={() => setIsCreatingGroup(false)}
              size={20}
              color="white"
            />
          </CloseButton>
          <h6>Adicionar amigos</h6>
          <p
            style={{
              color: 'white',
              fontFamily: 'Raleway',
              marginTop: '0.5rem',
            }}
          >
            Adicione mais usuários na conversa e tenha um divertido bate papo em
            grupo!
          </p>
          <DivFriends $hasFriends={hasFriends}>
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <>
                  <AddUserCard
                    conversationId={conversationId}
                    friend={friend}
                    key={index}
                  />
                </>
              ))
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h6 style={{ color: 'white', fontFamily: 'Raleway' }}>
                  Parece que você ainda não tem amigos adicionados.
                </h6>
              </div>
            )}
          </DivFriends>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalAddUsers;
