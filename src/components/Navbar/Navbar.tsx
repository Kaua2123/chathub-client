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
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ModalNotifications from '../ModalNotifications/ModalNotifications';
import chathub from '../../assets/chathub.png';

function Navbar() {
  const [isSeeingNotification, setIsSeeingNotification] = useState(false);
  const [isLoggedIn] = useState(true); // SIMULAR QUE ESTÁ LOGADO ( POR ENQUANTO )
  const [notifications] = useState([1, 2, 3, 4]);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    function checkNotifications() {
      if (notifications.length > 0) setHasNotifications(true);
    }

    checkNotifications();
  });

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
          {isLoggedIn ? (
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

              <UserAvatar>
                <Link className="profile-link" to={'/profile'}>
                  <User color="black" />
                </Link>
              </UserAvatar>
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
