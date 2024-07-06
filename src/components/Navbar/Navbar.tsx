import {
  BellIcon,
  Button,
  CircleIcon,
  Div,
  DivNotification,
  UserAvatar,
  UserDiv,
} from './styled';

import { User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import ModalNotifications from '../ModalNotifications/ModalNotifications';
import chathub from '../../assets/chathub.png';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import axios from '../../services/axios';
import { INotification } from '../../interfaces/INotification';
import { tokenDecoder } from '../../utils/tokenDecoder';
import { IUser } from '../../interfaces/IUser';

function Navbar() {
  const token = localStorage.getItem('token');
  const decodedToken = useMemo(() => tokenDecoder(token), []);

  const [user, setUser] = useState<IUser>();
  const [isSeeingNotification, setIsSeeingNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`user/${decodedToken?.id}`);

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    function checkNotifications() {
      if (notifications.length > 0) setHasNotifications(true);
    }

    checkNotifications();
  });

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get(
          `/notifications/findUserNotifications/${decodedToken?.id}`,
        );

        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, [notifications.length]);

  return (
    <div>
      {isSeeingNotification && (
        <ModalNotifications
          notifications={notifications}
          setIsSeeingNotification={setIsSeeingNotification}
        />
      )}
      <Div>
        <div>
          <img
            src={chathub}
            alt=""
            className="logo"
            style={{
              borderRadius: '1.8rem',
              height: '5rem',
            }}
          />
        </div>
        <UserDiv>
          {token ? (
            <>
              <DivNotification>
                <BellIcon
                  color="white"
                  onClick={() => setIsSeeingNotification(true)}
                />
                {hasNotifications && (
                  <CircleIcon color="inherit" size={15} fill="#4299E1" />
                )}
              </DivNotification>

              {user?.image ? (
                <UserAvatar onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <div
                    className="img-profile-link"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <img src={user?.image_url} alt="" />
                  </div>
                  {isMenuOpen && <MenuDropdown setIsMenuOpen={setIsMenuOpen} />}
                </UserAvatar>
              ) : (
                <UserAvatar onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <div className="profile-link">
                    <User color="black" />
                  </div>
                  {isMenuOpen && <MenuDropdown setIsMenuOpen={setIsMenuOpen} />}
                </UserAvatar>
              )}

              {/* <BellRing /> -> quando tiver notificações */}
            </>
          ) : (
            <>
              <Link to={'/register'}>
                <Button>Cadastrar-se</Button>
              </Link>
              <Link to={'/login'}>
                <Button>Entrar</Button>
              </Link>
            </>
          )}
        </UserDiv>
      </Div>
    </div>
  );
}

export default Navbar;
