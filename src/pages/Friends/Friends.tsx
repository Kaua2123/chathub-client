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

import { IFriend } from '../../interfaces/IFriend';
import { IFriendRequest } from '../../interfaces/IFriendRequest';
import { IUser } from '../../interfaces/IUser';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

function Friends() {
  const navigate = useNavigate();
  const decodedToken = useAuthContext();

  const [users, setUsers] = useState<IUser[]>([]);
  const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
  const [friends, setFriends] = useState<IFriend[]>([]);

  const [hasUsers, setHasUsers] = useState(false);
  const [hasFriendsRequests, setHasFriendsRequests] = useState(false);
  const [hasFriends, setHasFriends] = useState(false);

  const [query, setQuery] = useState('');
  const [username, setUsername] = useState('');

  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    if (!decodedToken) return navigate('/');

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
        const response = await axios.get(`/friendRequest/${decodedToken?.id}`);

        setFriendRequests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getFriends = async () => {
      try {
        const response = await axios.get(
          `/user/getUserFriends/${decodedToken?.id}`,
        );

        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
    getFriendRequests();
    getUsers();

    if (users.length > 0) setHasUsers(true);
    if (friendRequests.length > 0) setHasFriendsRequests(true);
    if (friends.length > 0) setHasFriends(true);
  }, [friendRequests.length, users.length, friends.length]);

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
        <DivFriends $hasFriends={hasFriends}>
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <FriendCard friend={friend} key={index} />
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
              <h5>Parece que você ainda não tem amigos adicionados.</h5>
            </div>
          )}
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
              <h5>Parece que você não recebeu nenhum pedido de amizade.</h5>
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
              <h5>Não achamos usuários por aqui...</h5>
            </div>
          )}
        </DivResult>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Friends;
