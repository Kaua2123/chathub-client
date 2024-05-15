import BottomMenu from '../../components/BottomMenu/BottomMenu';
import FriendCard from '../../components/FriendCard/FriendCard';
import FriendRequestCard from '../../components/FriendRequestCard/FriendRequestCard';
import Navbar from '../../components/Navbar/Navbar';
import { DivFriends, Div, DivFriendsRequests } from './styled';

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
      <BottomMenu />
    </div>
  );
}

export default Friends;
