import { BellIcon, Div, UserAvatar, UserDiv } from './styled';

import chathub from '../../assets/chathub.png';
import { User } from 'lucide-react';

function Navbar() {
  return (
    <div>
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
          <BellIcon color="white" />
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
