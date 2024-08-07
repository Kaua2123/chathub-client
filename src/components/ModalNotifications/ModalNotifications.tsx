import { INotification } from '../../interfaces/INotification';
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
  notifications: INotification[];
};

function ModalNotifications({
  setIsSeeingNotification,
  notifications,
}: ModalNotificationsProps) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsSeeingNotification(false);
    }
  };

  return (
    <div>
      <Modal id="modal" onClick={(e) => handleOutsideClick(e)}>
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
            {notifications &&
              notifications.map((notification, index) => (
                <NotificationCard notification={notification} key={index} />
              ))}
            {notifications.length <= 0 && <h6>Sem notificações por aqui...</h6>}
          </DivNotifications>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalNotifications;
