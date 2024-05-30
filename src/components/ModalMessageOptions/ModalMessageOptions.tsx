import {
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  Modal,
} from './styled';

export type ModalMessageOptions = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: string;
};

function ModalMessageOptions({
  setIsModalOpen,
  children,
}: ModalMessageOptions) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Modal id="modal" onClick={handleOutsideClick}>
        <Container>
          <CloseButton>
            <CircleXIcon
              onClick={() => setIsModalOpen(false)}
              size={20}
              color="white"
            />
          </CloseButton>
          <Div>
            <div className="msg-section">
              <div className="message">{children}</div>
              <h6 style={{ marginBottom: '5rem' }}>O que quer fazer?</h6>
            </div>
          </Div>
          <Div>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="cancel-delete-friend-btn"
            >
              Excluir
            </Button>
            <Button className="delete-friend-btn">Editar</Button>
          </Div>
        </Container>
      </Modal>
    </div>
  );
}

export default ModalMessageOptions;
