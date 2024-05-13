import {
  CircleXIcon,
  CloseButton,
  Container,
  Modal,
  BellIcon,
  Div,
  Notification,
  TrashIcon,
  DeleteButton,
  DivNotifications,
} from './styled';

export type ModalNotificationsProps = {
  setIsSeeingNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalNotifications({
  setIsSeeingNotification,
}: ModalNotificationsProps) {
  return (
    <div>
      <Modal>
        <Container>
          <Div>
            <BellIcon size={50} />
            <DeleteButton>
              <TrashIcon size={40} />
            </DeleteButton>
            <CloseButton>
              <CircleXIcon
                onClick={() => setIsSeeingNotification(false)}
                size={20}
                color="white"
              />
            </CloseButton>
          </Div>
          <DivNotifications>
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <Notification key={i}>
                  ${i} Você recebeu um pedido de amizade de username201
                </Notification>
              );
            })}
          </DivNotifications>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalNotifications;
