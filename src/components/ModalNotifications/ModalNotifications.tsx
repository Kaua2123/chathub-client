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

export type ModalNotificationsProps = {
  setIsSeeingNotification: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: number[];
};

function ModalNotifications({
  setIsSeeingNotification,
  notifications,
}: ModalNotificationsProps) {
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
