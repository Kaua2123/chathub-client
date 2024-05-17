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
};

function ModalDeleting({ setIsDeleting }: ModalDeletingProps) {
  return (
    <div>
      <Modal>
        <Container>
          <CloseButton>
            <CircleXIcon
              onClick={() => setIsDeleting(false)}
              size={20}
              color="white"
            />
          </CloseButton>
          <Div>
            <h6 style={{ marginBottom: '2rem' }}>
              Tem certeza de que quer remover esse usuário de sua lista de
              amigos?
            </h6>
          </Div>
          <Div>
            <Button className="cancel-delete-friend-btn">
              Não, me enganei
            </Button>
            <Button className="delete-friend-btn">Sim, tenho certeza</Button>
          </Div>
        </Container>
      </Modal>
    </div>
  );
}

export default ModalDeleting;
