import { User } from 'lucide-react';
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
  const [httpUnreadMessages, setHttpUnreadMessages] = useState<IMessage[]>([]);
  const [wsUnreadMessagesLength, setWsUnreadMessagesLength] = useState(0);
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const [wsLastMessageContent, setWsLastMessageContent] = useState('');
  // const [wsLastMessageContent, setWsLastMessageContent] = useState('');
  const [lastMessageContent, setLastMessageContent] = useState('');
  const [slicedMessage, setSlicedMessage] = useState('');

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    socket.on('unreadMsgsCounter', (data) => {
      setWsUnreadMessagesLength(data + 1);
    });

    socket.on('newLastMsg', (data) => {
      setWsLastMessageContent(data.content);
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    const sliced = addThreeDotsOnBigMessage(
      !wsLastMessageContent ? lastMessageContent : wsLastMessageContent,
    );

    setSlicedMessage(sliced);
  }, [lastMessageContent, wsLastMessageContent]);

  useEffect(() => {
    const checkUserName = () => {
      if (conversation.Users[0].users_conversations.UserId != userId) {
        setUsername(conversation.Users[0].username);
      } else {
        setUsername(conversation.Users[1].username);
      }
    };

    checkUserName();
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
                <User color="black" />
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
