import { toast } from 'sonner';
import axios from '../../services/axios';
import {
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  H6,
  Modal,
  WavingPencilIcon,
} from './styled';
import { AxiosError } from 'axios';
import { useState } from 'react';

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
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsModalOpen(false);
    }
  };

  const updateMessage = async () => {
    try {
      console.log('foi');
    } catch (error) {
      console.log(error);
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
          <Div $isUpdating={isUpdating}>
            <div className="msg-section">
              {!isUpdating ? (
                <>
                  <div className="message">{children}</div>
                  <h6 style={{ marginBottom: '5rem' }}>O que quer fazer?</h6>
                </>
              ) : (
                <>
                  <input value={children} className="message"></input>
                  <H6>
                    Editando...
                    <WavingPencilIcon size={20} />
                  </H6>
                </>
              )}
            </div>
          </Div>
          <Div>
            <Button
              onClick={!isUpdating ? deleteMessage : () => setIsUpdating(false)}
              className="cancel-delete-friend-btn"
            >
              {isUpdating && <p>Cancelar</p>}
              {!isUpdating && <p>Excluir</p>}
            </Button>
            <Button
              className="delete-friend-btn"
              onClick={!isUpdating ? () => setIsUpdating(true) : updateMessage}
            >
              Editar
            </Button>
          </Div>
        </Container>
      </Modal>
    </div>
  );
}

export default ModalMessageOptions;
