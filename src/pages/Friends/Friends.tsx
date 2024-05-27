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
import { IFriendRequest } from '../../interfaces/IFriendRequest';
import { IToken } from '../../interfaces/IToken';
import { jwtDecode } from 'jwt-decode';

function Friends() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [hasUsers, setHasUsers] = useState(false);
  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
  const [hasFriendsRequests, setHasFriendsRequests] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken: IToken = jwtDecode(token as string);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/user');

        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getFriendRequests = async () => {
      try {
        const response = await axios.get(`/friendRequest/${decodedToken.id}`);

        setFriendRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriendRequests();
    getUsers();

    if (users.length > 0) setHasUsers(true);
    if (friendRequests.length > 0) setHasFriendsRequests(true);
  }, [decodedToken.id, friendRequests.length, users.length]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchUsers(username);
    }
  };

  const handleSearchUsers = (query: string) => {
    setQuery(username);
    query ? setIsFiltering(true) : setIsFiltering(false);
    const filtered = users.filter((user) => user.username.includes(query));
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
        <DivFriendsRequests $hasFriendsRequests={hasFriendsRequests}>
          {friendRequests.length > 0 ? (
            friendRequests.map((friendRequest, index) => (
              <FriendRequestCard friendRequest={friendRequest} key={index} />
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
              <h3>Parece que você não recebeu nenhum pedido de amizade.</h3>
            </div>
          )}
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
            <Button onClick={() => handleSearchUsers(username)}>
              <SearchIcon />
            </Button>
          </div>
        </DivSearchUsers>
        {isFiltering ? (
          <p className="result">Resultados para {query} </p>
        ) : (
          <p className="result">Busque aqui um usuário </p>
        )}
        <DivResult $hasUsers={hasUsers}>
          {users.length > 0 ? (
            isFiltering ? (
              filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <UserCard user={user} key={index} />
                ))
              ) : (
                <h3>Nenhum resultado encontrado para: {query}</h3>
              )
            ) : (
              users.map((user, index) => <UserCard user={user} key={index} />)
            )
          ) : (
            <div
              style={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h3>Não achamos usuários por aqui...</h3>
            </div>
          )}
        </DivResult>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Friends;
