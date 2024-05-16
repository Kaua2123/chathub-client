import { BellIcon, Button, Div, UserAvatar, UserDiv } from './styled';

import chathub from '../../assets/chathub.png';
import { User } from 'lucide-react';
import { useState } from 'react';
import ModalNotifications from '../ModalNotifications/ModalNotifications';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isSeeingNotification, setIsSeeingNotification] = useState(false);
  const [isLoggedIn] = useState(true); // SIMULAR QUE ESTÁ LOGADO ( POR ENQUANTO )

  return (
    <div>
      {isSeeingNotification && (
        <ModalNotifications setIsSeeingNotification={setIsSeeingNotification} />
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
              <BellIcon
                color="white"
                onClick={() => setIsSeeingNotification(true)}
              />
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
