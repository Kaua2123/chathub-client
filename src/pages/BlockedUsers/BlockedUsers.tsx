import BlockedUserCard from '../../components/BlockedUserCard/BlockedUserCard';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import Navbar from '../../components/Navbar/Navbar';
import { Div, DivBlockedUsers } from './styled';

function BlockedUsers() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <BlockedUserCard key={i} />
          ))}
        </DivBlockedUsers>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default BlockedUsers;
