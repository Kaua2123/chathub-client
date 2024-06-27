import { CircleXIcon, CloseButton, Container, DivUsers, Modal } from './styled';
import axios from '../../services/axios';
import UserCard from '../UserCard/UserCard';

import { useEffect, useState } from 'react';
import { IToken } from 'jwt-decode';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export type ModalUsersInGroup = {
  conversationId: string | undefined;
  setIsCreatingGroup: React.Dispatch<React.SetStateAction<boolean>>;
  decodedToken: IToken | undefined;
};

function ModalUsersInGroup({
  conversationId,
  decodedToken,
  setIsCreatingGroup,
}: ModalUsersInGroup) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsCreatingGroup(false);
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getCurrentConversation = async () => {
      try {
        const response = await axios.get(
          `/conversation/show/${decodedToken?.id}/${conversationId}`,
        );

        setUsers(response.data[0].Users);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    };

    getCurrentConversation();
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
          <h6>Usuários</h6>
          <p
            style={{
              color: 'white',
              fontFamily: 'Raleway',
              marginTop: '0.5rem',
            }}
          >
            Veja os usuários participantes desta conversa.
          </p>
          <DivUsers>
            {users.length > 0 ? (
              users.map((user, index) => (
                <>
                  <UserCard
                    isGroup={true}
                    conversationId={conversationId}
                    user={user}
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
          </DivUsers>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalUsersInGroup;
