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
import { useEffect, useState } from 'react';
import { handleKeyDown } from '../../utils/handleKeyDown';
import { useSocketContext } from '../../hooks/useSocketContext';

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
  const socket = useSocketContext();

  const [isUpdating, setIsUpdating] = useState(false);
  const [content, setContent] = useState('');
  const [slicedContent, setSlicedContent] = useState('');

  // 27 letras

  useEffect(() => {
    const addThreeDotsOnBigMessage = () => {
      if (children.length > 27) {
        const sliced = children.slice(0, 25);
        const slicedWithDots = `${sliced}...`;
        setSlicedContent(slicedWithDots);
      }
    };

    addThreeDotsOnBigMessage();
  }, []);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'modal') {
      setIsModalOpen(false);
    }
  };

  const updateMessage = async () => {
    try {
      const response = await axios.put(`/messages/update/${id}`, {
        content,
        is_updated: true,
      });

      setIsModalOpen(false);
      const msg = response.data;
      socket.emit('updatedMsg', msg.id, msg.content);

      toast.success('Mensagem atualizada com sucesso.');
      setIsUpdating(false);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const deleteMessage = async () => {
    try {
      const response = await axios.put(`/messages/update/${id}`, {
        content: 'Mensagem apagada',
        is_updated: false,
        is_deleted: true,
      });

      setIsModalOpen(false);
      const msg = response.data;
      socket.emit('deletedMsg', msg.id);

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
                  <div className="message">{slicedContent}</div>
                  <h6 style={{ marginBottom: '5rem' }}>O que quer fazer?</h6>
                </>
              ) : (
                <>
                  <Input
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={children}
                    className="message"
                    onKeyDown={(e) => handleKeyDown(e, updateMessage)}
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
