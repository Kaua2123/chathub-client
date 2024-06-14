import { User } from 'lucide-react';
import {
  Container,
  Div,
  DivMessage,
  MessageContent,
  UpdatedMessage,
  UserAvatar,
} from './styled';
import { useEffect, useState } from 'react';
import ModalMessageOptions from '../ModalMessageOptions/ModalMessageOptions';
import { useSocketContext } from '../../hooks/useSocketContext';

export type MessageProps = {
  isSender?: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  children: string;
  id: number;
};

function Message({
  isSender,
  children,
  id,
  isUpdated,
  isDeleted,
}: MessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [isMsgDeleted, setIsMsgDeleted] = useState(false);
  const socket = useSocketContext();

  useEffect(() => {
    socket.on('msgDeleted', (data) => {
      console.log('logando: ', data);
      if (data === id) {
        setMessageContent('Mensagem apagada.');
        setIsMsgDeleted(true);
      } else {
        setMessageContent(children);
      }
    });
  }, [socket]);

  const handleModalOpen = () => {
    if (isSender && !isDeleted && !isMsgDeleted) setIsModalOpen(true);
  };

  return (
    <div>
      {isModalOpen && (
        <ModalMessageOptions id={id} setIsModalOpen={setIsModalOpen}>
          {children}
        </ModalMessageOptions>
      )}
      <DivMessage
        id="div-message"
        $isSender={isSender}
        onClick={handleModalOpen}
      >
        <UserAvatar>
          <User />
        </UserAvatar>
        <Container $isSender={isSender} $isDeleted={isDeleted || isMsgDeleted}>
          <Div>
            <MessageContent
              $isSender={isSender}
              $isDeleted={isDeleted || isMsgDeleted}
            >
              {messageContent ? messageContent : children}
            </MessageContent>
          </Div>
          {isUpdated && (
            <UpdatedMessage>
              <p>Editado</p>
            </UpdatedMessage>
          )}
        </Container>
      </DivMessage>
    </div>
  );
}

export default Message;
