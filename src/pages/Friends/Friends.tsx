import BottomMenu from '../../components/BottomMenu/BottomMenu';
import FriendCard from '../../components/FriendCard/FriendCard';
import Navbar from '../../components/Navbar/Navbar';
import { DivFriends, Div } from './styled';

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
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Friends;
