import { useEffect, useState } from 'react';
import BlockedUserCard from '../../components/BlockedUserCard/BlockedUserCard';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import Navbar from '../../components/Navbar/Navbar';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../services/axios';
import { Div, DivBlockedUsers } from './styled';

function BlockedUsers() {
  const decodedToken = useAuthContext();

  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const getBlockedUsers = async () => {
      try {
        const response = await axios.get(`/blockedUsers/${decodedToken?.id}`);
        setBlockedUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBlockedUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Div>
        <p className="title">Usuários bloqueados</p>
        <p className="subtitle">
          Usuários que você bloqueou não te mandarão mensagens ou o adicionarão
          em grupos.
        </p>

        <DivBlockedUsers>
          {blockedUsers.map((blockedUser, index) => (
            <BlockedUserCard blockedUser={blockedUser} key={index} />
          ))}
        </DivBlockedUsers>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default BlockedUsers;
