import { Container, MessageCircleIcon, Modal } from './styled';

export type LoadingProps = {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelete: () => Promise<void>;
};

function Loading() {
  return (
    <div>
      <Modal id="modal">
        <Container>
          <MessageCircleIcon size={60} />
          <p>Carregando...</p>
        </Container>
      </Modal>
    </div>
  );
}

export default Loading;
