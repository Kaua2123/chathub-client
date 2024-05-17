import NotificationCard from '../NotificationCard/NotificationCard';
import {
  CircleXIcon,
  CloseButton,
  Container,
  Modal,
  BellIcon,
  Div,
  DivNotifications,
} from './styled';

import { useState } from 'react';

export type ModalNotificationsProps = {
  setIsSeeingNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setHasNotifications: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalNotifications({
  setIsSeeingNotification,
  setHasNotifications,
}: ModalNotificationsProps) {
  const [notifications] = useState([1, 2, 3, 4]);

  notifications ? setHasNotifications(true) : setHasNotifications(false);

  return (
    <div>
      <Modal>
        <Container>
          <Div>
            <BellIcon size={50} />

            <CloseButton>
              <CircleXIcon
                onClick={() => setIsSeeingNotification(false)}
                size={20}
                color="white"
              />
            </CloseButton>
          </Div>
          <DivNotifications>
            {notifications.map((_, i) => {
              return <NotificationCard key={i} />;
            })}
          </DivNotifications>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalNotifications;
