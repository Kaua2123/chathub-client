import { User, Users } from 'lucide-react';
import {
  DivMessageHourAndCounter,
  DivOrdering,
  MessageCounter,
  MessageHour,
  UserAvatar,
  WavingGrabHand,
} from './styled';
import { Container, DivUser, UserNameAndMessage } from './styled';
import { useNavigate } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IConversation } from '../../interfaces/IConversation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../services/axios';
import { IMessage } from '../../interfaces/IMessage';
import { convertDateToHours } from '../../utils/convertDateToHours';
import { useSocketContext } from '../../hooks/useSocketContext';
import { addThreeDotsOnBigMessage } from '../../utils/addThreeDotsOnBigMessage';
import { IOnlineUsers } from '../../interfaces/IOnlineUsers';

export type ConversationCardProps = {
  id: number;
  isDragging: boolean;
  conversation: IConversation;
};

function ConversationCard({
  id,
  isDragging,
  conversation,
}: ConversationCardProps) {
  const navigate = useNavigate();

  const decodedToken = useAuthContext();
  const socket = useSocketContext();

  const userId = decodedToken?.id;

  const [username, setUsername] = useState('');
  const [recipientId, setRecipientId] = useState(0);
  const [httpUnreadMessages, setHttpUnreadMessages] = useState<IMessage[]>([]);
  const [wsUnreadMessagesLength, setWsUnreadMessagesLength] = useState(0);
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const [wsLastMessageContent, setWsLastMessageContent] = useState('');
  const [lastMessageContent, setLastMessageContent] = useState('');
  const [slicedMessage, setSlicedMessage] = useState('');

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const newLastMsg = (socketRecipient: IOnlineUsers) => {
    socket.on('newLastMsg', (data, socket) => {
      if (!socketRecipient) return;

      if (socketRecipient.socketId === socket) {
        setWsLastMessageContent(data[0].content);
      }
    });
  };

  const unreadMsgsCounter = (socketRecipient: IOnlineUsers) => {
    socket.on('unreadMsgsCounter', (data, socket) => {
      if (!socketRecipient) return;

      if (socketRecipient.socketId === socket) {
        setWsUnreadMessagesLength(data[0] + 1);
      }
    });
  };

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        if (!id) return;

        const response = await axios.get(
          `/conversation/show/${decodedToken?.id}/${id}`,
        );

        response.data[0].Users[0].users_conversations.UserId !==
        decodedToken?.id
          ? setRecipientId(response.data[0].Users[0].users_conversations.UserId)
          : setRecipientId(
              response.data[0].Users[1].users_conversations.UserId,
            );
      } catch (error) {
        console.log(error);
      }
    };

    getRecipientId();
  }, [id]);

  useEffect(() => {
    socket.emit('newUser', decodedToken?.id);
    socket.on('onlineUsers', (onlineUsers: IOnlineUsers[]) => {
      const socketRecipient = onlineUsers.find(
        (user) => user.userId === recipientId,
      );

      if (!socketRecipient) return;
      newLastMsg(socketRecipient);
      unreadMsgsCounter(socketRecipient);
    });
  }, [recipientId]);

  useEffect(() => {
    const sliced = addThreeDotsOnBigMessage(
      wsLastMessageContent || lastMessageContent,
    );

    setSlicedMessage(sliced);
  }, [lastMessageContent, wsLastMessageContent]);

  useEffect(() => {
    const checkUsername = () => {
      if (conversation.Users[0].users_conversations.UserId != userId) {
        setUsername(conversation.Users[0].username);
      } else {
        setUsername(conversation.Users[1].username);
      }
    };

    checkUsername();
  }, [conversation.Users, userId]);

  useEffect(() => {
    const getLastMessageOfAConversation = async () => {
      try {
        const response = await axios.get(
          `/messages/getLastMessage/${conversation.id}`,
        );

        const lastMsg: IMessage = response.data;
        setLastMessage(lastMsg);

        lastMsg.UserId === userId
          ? setLastMessageContent(`Você: ${lastMsg.content}`)
          : setLastMessageContent(lastMsg.content);
      } catch (error) {
        console.log('an error ocurred: ', error);
      }
    };

    const getUnreadMessages = async () => {
      try {
        const response = await axios.get(
          `/messages/getUnreadMessages/${id}/${userId}`,
        );
        setHttpUnreadMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUnreadMessages();
    getLastMessageOfAConversation();
  }, [lastMessageContent]);

  return (
    <>
      {isDragging ? (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Container $isDragging={isDragging}>
            <DivUser>
              <UserAvatar>
                <>
                  {conversation.type === 'group' ? (
                    <Users color="black" />
                  ) : (
                    <User color="black" />
                  )}
                </>
              </UserAvatar>
              <UserNameAndMessage>
                <p className="username">{username} </p>
                <p className="user-message">
                  {lastMessageContent ? slicedMessage : 'Comece a conversar!'}
                </p>
              </UserNameAndMessage>
            </DivUser>
            <DivOrdering>
              <p>Arraste-me...</p>
              <WavingGrabHand color="white" />
            </DivOrdering>
          </Container>
        </div>
      ) : (
        <div>
          <Container
            $isDragging={isDragging}
            onClick={() => {
              navigate(`/chat/${id}/${username}`);
            }}
          >
            <DivUser>
              <UserAvatar>
                <User color="black" />
              </UserAvatar>
              <UserNameAndMessage>
                <p className="username">{username} </p>
                <p className="user-message">
                  {lastMessageContent ? slicedMessage : 'Comece a conversar!'}
                </p>
              </UserNameAndMessage>
            </DivUser>
            <DivMessageHourAndCounter>
              <MessageHour>
                <b>
                  <p>
                    {lastMessage
                      ? convertDateToHours(lastMessage.createdAt)
                      : '00:00'}
                  </p>
                </b>
              </MessageHour>
              {(httpUnreadMessages.length > 0 ||
                wsUnreadMessagesLength > 0) && (
                <MessageCounter>
                  <b>
                    <p>
                      {wsUnreadMessagesLength != 0
                        ? wsUnreadMessagesLength
                        : httpUnreadMessages.length}
                    </p>
                  </b>
                </MessageCounter>
              )}
            </DivMessageHourAndCounter>
          </Container>
        </div>
      )}
    </>
  );
}

export default ConversationCard;
