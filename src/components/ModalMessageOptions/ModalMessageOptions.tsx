import { toast } from 'sonner';
import axios from '../../services/axios';
import {
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  Modal,
} from './styled';
import { AxiosError } from 'axios';

export type ModalMessageOptions = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: string;
  id: number;
};

function ModalMessageOptions({
  setIsModalOpen,
  children,
  id,
}: ModalMessageOptions) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsModalOpen(false);
    }
  };

  const deleteMessage = async () => {
    try {
      await axios.delete(`/messages/delete/${id}`);

      setIsModalOpen(false);
      toast.success('Mensagem deletada com sucesso.');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
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
              onClick={deleteMessage}
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
