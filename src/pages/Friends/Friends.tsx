import { useEffect, useState } from 'react';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import FriendCard from '../../components/FriendCard/FriendCard';
import FriendRequestCard from '../../components/FriendRequestCard/FriendRequestCard';
import Navbar from '../../components/Navbar/Navbar';
import UserCard from '../../components/UserCard/UserCard';
import {
  DivFriends,
  Div,
  DivFriendsRequests,
  DivSearchUsers,
  Button,
  SearchIcon,
  Input,
  DivResult,
} from './styled';
import axios from '../../services/axios';
import { IUser } from '../../interfaces/IUser';

function Friends() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [username, setUsername] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/user');

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchUsers();
    }
  };

  const handleSearchUsers = () => {
    username ? setIsFiltering(true) : setIsFiltering(false);
    const filtered = users.filter((user) => user.username.includes(username));
    setFilteredUsers(filtered);
  };

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
            <Input
              type="text"
              placeholder="Nome do usuário"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
          </div>
          <div className="btn-search-div">
            <Button onClick={handleSearchUsers}>
              <SearchIcon />
            </Button>
          </div>
        </DivSearchUsers>
        {isFiltering ? (
          <p className="result">Resultados para {username} </p>
        ) : (
          <p className="result">Busque aqui um usuário </p>
        )}
        <DivResult>
          {isFiltering
            ? filteredUsers.map((user, index) => (
                <UserCard user={user} key={index} />
              ))
            : users.map((user, index) => <UserCard user={user} key={index} />)}
        </DivResult>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Friends;
