import BottomMenu from '../../components/BottomMenu/BottomMenu';
import FriendCard from '../../components/FriendCard/FriendCard';
import FriendRequestCard from '../../components/FriendRequestCard/FriendRequestCard';
import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import { DivResult } from '../../components/UserCard/styled';
import {
  DivFriends,
  Div,
  DivFriendsRequests,
  DivSearchUsers,
  Button,
  SearchIcon,
} from './styled';

function Friends() {
  return (
    <div>
      <Navbar />
      <Div>
        <p className="title">Amigos</p>
        <DivFriends>
          {Array.from({ length: 14 }).map((_, i) => (
            <FriendCard key={i} />
          ))}
        </DivFriends>
      </Div>

      <Div>
        <p className="title">Pedidos de amizade</p>
        <DivFriendsRequests>
          {Array.from({ length: 2 }).map((_, i) => (
            <FriendRequestCard key={i} />
          ))}
        </DivFriendsRequests>
      </Div>

      <Div>
        <p className="title">Buscar usuários</p>
        <DivSearchUsers>
          <div className="input-div">
            <input type="text" placeholder="Nome do usuário" />
          </div>
          <div className="btn-search-div">
            <Button>
              <SearchIcon />
            </Button>
          </div>
        </DivSearchUsers>
        <DivResult>
          <p className="result">Resultados para username: </p>
          <UserCard />
        </DivResult>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Friends;
