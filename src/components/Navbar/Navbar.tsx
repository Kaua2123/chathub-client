import { BellIcon, Div, UserAvatar, UserDiv } from './styled';

import chathub from '../../assets/chathub.png';
import { User } from 'lucide-react';
import { useState } from 'react';
import ModalNotifications from '../ModalNotifications/ModalNotifications';

function Navbar() {
  const [isSeeingNotification, setIsSeeingNotification] = useState(false);

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
              cursor: 'pointer',
            }}
          />
        </div>
        <UserDiv>
          <BellIcon
            color="white"
            onClick={() => setIsSeeingNotification(true)}
          />
          <UserAvatar>
            <User color="black" />
          </UserAvatar>
          {/* <BellRing /> -> quando tiver notificações */}
        </UserDiv>
      </Div>
    </div>
  );
}

export default Navbar;
