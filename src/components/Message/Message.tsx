import {
  Container,
  Div,
  DivMessage,
  MessageContent,
  ReadMessage,
  UpdatedMessage,
} from './styled';
import { useEffect, useState } from 'react';
import ModalMessageOptions from '../ModalMessageOptions/ModalMessageOptions';
import { useSocketContext } from '../../hooks/useSocketContext';
import { useChatContext } from '../../hooks/useChatContext';
import { IMessage } from '../../interfaces/IMessage';

export type MessageProps = {
  isSender?: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  isReadBy: string;
  children: string;
  id: number;
  username: string | undefined;
};

function Message({
  isSender,
  children,
  id,
  isUpdated,
  isDeleted,
  isReadBy,
  username,
}: MessageProps) {
  const { recipientId } = useChatContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [isMsgDeleted, setIsMsgDeleted] = useState(false);
  const [isMsgUpdated, setIsMsgUpdated] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isMsgRead, setIsMsgRead] = useState(false);
  const socket = useSocketContext();

  useEffect(() => {
    const checkIfMessagesIsRead = () => {
      isReadBy.includes(recipientId.toString())
        ? setIsRead(true)
        : setIsRead(false);
    };

    checkIfMessagesIsRead();
  }, [recipientId, isReadBy]);

  useEffect(() => {
    socket.on('msgDeleted', (data) => {
      if (data === id) {
        setMessageContent('Mensagem apagada.');
        setIsMsgDeleted(true);
      }
    });

    socket.on('msgUpdated', (data) => {
      if (data[0] === id) {
        setIsMsgUpdated(true);
        setMessageContent(data[1]);
      }
    });

    socket.on('msgRead', (data: IMessage[]) => {
      data.map((message) => {
        message.is_read_by.includes(recipientId.toString())
          ? setIsMsgRead(true)
          : setIsMsgRead(false);
      });
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
        <p className="username">{isSender ? 'Você' : username}</p>
        <Container $isSender={isSender} $isDeleted={isDeleted || isMsgDeleted}>
          <Div>
            <MessageContent
              $isSender={isSender}
              $isDeleted={isDeleted || isMsgDeleted}
            >
              {isDeleted || isMsgDeleted ? (
                <b>{messageContent ? messageContent : children}</b>
              ) : messageContent ? (
                messageContent
              ) : (
                children
              )}
            </MessageContent>
          </Div>
          {(isUpdated || isMsgUpdated) && (
            <UpdatedMessage $isSender={isSender}>
              <p>Editado</p>
            </UpdatedMessage>
          )}
        </Container>
        {(isRead || isMsgRead) && isSender && (
          <ReadMessage>
            <p>
              <b>Visualizado</b>
            </p>
          </ReadMessage>
        )}
      </DivMessage>
    </div>
  );
}

export default Message;
