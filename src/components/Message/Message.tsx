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
import { User } from '../../interfaces/IConversation';
import { IMessage } from '../../interfaces/IMessage';

export type MessageProps = {
  isSender?: boolean;
  isUpdated: boolean;
  isDeleted: boolean;
  isReadBy: string[];
  children: string;
  id: number;
  username: string | undefined;
  isGroup: string | null;
  recipientId: number;
  recipientUsers: User[];
};

function Message({
  isSender,
  children,
  id,
  isUpdated,
  isDeleted,
  isReadBy,
  username,
  isGroup,
  recipientId,
  recipientUsers,
}: MessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [wsIsMsgDeleted, setWsIsMsgDeleted] = useState(false);
  const [wsIsMsgUpdated, setWsIsMsgUpdated] = useState(false);
  const [wsIsMsgRead, setWsIsMsgRead] = useState(false);
  const socket = useSocketContext();

  const isReadInGroup =
    isGroup === 'true' &&
    recipientUsers.every((userRecipient) =>
      isReadBy.includes(userRecipient.id.toString()),
    );

  const isRead =
    isGroup === 'false' && isReadBy.includes(recipientId.toString());

  console.log(
    isReadBy,
    recipientId.toString(),
    isReadBy.includes(recipientId.toString()), // false
    isRead,
  );

  useEffect(() => {
    socket.on('msgDeleted', (data) => {
      if (data === id) {
        setMessageContent('Mensagem apagada.');
        setWsIsMsgDeleted(true);
      }
    });

    socket.on('msgUpdated', (data) => {
      if (data[0] === id) {
        setWsIsMsgUpdated(true);
        setMessageContent(data[1]);
      }
    });

    socket.on('msgRead', (data: IMessage[]) => {
      data.map((message) => {
        message.is_read_by.includes(recipientId.toString())
          ? setWsIsMsgRead(true)
          : setWsIsMsgRead(false);
      });
    });

    // socket.on('msgReadI', (data: boolean) => {
    //   setWsIsMsgRead(data);
    //   console.log('data: ', data);
    // });

    socket.on('msgReadInGroup', (data: boolean) => {
      if (isGroup === 'true') setWsIsMsgRead(data);
      console.log('data: ', data);
    });
  }, [socket]);

  const handleModalOpen = () => {
    if (isSender && !isDeleted && !wsIsMsgDeleted) setIsModalOpen(true);
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
        <Container
          $isSender={isSender}
          $isDeleted={isDeleted || wsIsMsgDeleted}
        >
          <Div>
            <MessageContent
              $isSender={isSender}
              $isDeleted={isDeleted || wsIsMsgDeleted}
            >
              {isDeleted || wsIsMsgDeleted ? (
                <b>{messageContent ? messageContent : children}</b>
              ) : messageContent ? (
                messageContent
              ) : (
                children
              )}
            </MessageContent>
          </Div>
          {(isUpdated || wsIsMsgUpdated) && (
            <UpdatedMessage $isSender={isSender}>
              <p>Editado</p>
            </UpdatedMessage>
          )}
        </Container>
        {(isRead || isReadInGroup || wsIsMsgRead) && !isDeleted && isSender && (
          <ReadMessage>
            <p>
              <b>{isGroup === 'true' ? 'Visto por todos' : 'Visualizado'}</b>
            </p>
          </ReadMessage>
        )}
      </DivMessage>
    </div>
  );
}

export default Message;
