import {
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  Modal,
} from './styled';

export type ModalDeletingProps = {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelete: () => Promise<void>;
};

function ModalDeleting({
  setIsDeleting,
  handleClickDelete,
}: ModalDeletingProps) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Modal id="modal" onClick={handleOutsideClick}>
        <Container>
          <CloseButton>
            <CircleXIcon
              onClick={() => setIsDeleting(false)}
              size={20}
              color="white"
            />
          </CloseButton>
          <Div>
            <h6 style={{ marginBottom: '2rem' }}>Tem certeza disso?</h6>
          </Div>
          <Div>
            <Button
              onClick={() => setIsDeleting(false)}
              className="cancel-delete-friend-btn"
            >
              Não, me enganei
            </Button>
            <Button className="delete-friend-btn" onClick={handleClickDelete}>
              Sim, tenho certeza
            </Button>
          </Div>
        </Container>
      </Modal>
    </div>
  );
}

export default ModalDeleting;
