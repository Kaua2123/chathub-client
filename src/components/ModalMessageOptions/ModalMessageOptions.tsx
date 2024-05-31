import { toast } from 'sonner';
import axios from '../../services/axios';
import {
  Button,
  CircleXIcon,
  CloseButton,
  Container,
  Div,
  H6,
  Input,
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
  const [content, setContent] = useState('');

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsModalOpen(false);
    }
  };

  const updateMessage = async () => {
    try {
      await axios.put(`/messages/update/${id}`, {
        content,
        is_updated: true,
      });

      toast.success('Mensagem atualizada com sucesso.');
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateMessage();
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
                  <Input
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={children}
                    className="message"
                    onKeyDown={(e) => handleKeyDown(e)}
                  ></Input>
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
