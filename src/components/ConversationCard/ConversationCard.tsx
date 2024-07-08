import { User, Users } from 'lucide-react';
import {
  DivMessageHourAndCounter,
  MessageCounter,
  MessageHour,
  UserAvatar,
  UserImage,
} from './styled';
import { Container, DivUser, UserNameAndMessage } from './styled';
import { useNavigate } from 'react-router-dom';
import { IConversation } from '../../interfaces/IConversation';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from '../../services/axios';
import { IMessage } from '../../interfaces/IMessage';
import { convertDateToHours } from '../../utils/convertDateToHours';
import { useSocketContext } from '../../hooks/useSocketContext';
import { addThreeDotsOnBigMessage } from '../../utils/addThreeDotsOnBigMessage';
import { IOnlineUsers } from '../../interfaces/IOnlineUsers';
import { IUser } from '../../interfaces/IUser';

export type ConversationCardProps = {
  id: number;
  conversation: IConversation;
};

function ConversationCard({ id, conversation }: ConversationCardProps) {
  const navigate = useNavigate();

  const decodedToken = useAuthContext();
  const socket = useSocketContext();

  const userId = decodedToken?.id;

  const [username, setUsername] = useState('');
  const [userRecipient, setUserRecipient] = useState<IUser>();
  const [recipientId, setRecipientId] = useState(0);
  const [httpUnreadMessages, setHttpUnreadMessages] = useState<IMessage[]>([]);
  const [wsUnreadMessagesLength, setWsUnreadMessagesLength] = useState(0);
  const [wsUnreadMessagesInGroupLength, setWsUnreadMessagesInGroupLength] =
    useState(0);
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const [lastMessageContent, setLastMessageContent] = useState('');
  const [slicedMessage, setSlicedMessage] = useState('');
  const [isGroup, setIsGroup] = useState(false);

  const wsUnreadMessageInGroupOrHttp =
    wsUnreadMessagesInGroupLength || httpUnreadMessages.length;

  const wsUnreadMessageOrHttp =
    wsUnreadMessagesLength || httpUnreadMessages.length;

  useEffect(() => {
    conversation.type == 'group' ? setIsGroup(true) : setIsGroup(false);
  }, []);

  useEffect(() => {
    if (lastMessageContent) {
      const sliced = addThreeDotsOnBigMessage(lastMessageContent);
      setSlicedMessage(sliced);
    }
  }, [lastMessageContent]);

  const newLastMsg = (socketRecipient: IOnlineUsers) => {
    socket.on('newLastMsg', (data, socket) => {
      if (!socketRecipient) return;

      if (socketRecipient.socketId === socket && id == data[1]) {
        const sliced = addThreeDotsOnBigMessage(data[0].content);
        setSlicedMessage(sliced);
      }
    });
  };

  const newLastMsgInGroup = () => {
    socket.on('newLastMsgInGroup', (data) => {
      console.log('newLastMsgInGroup chamada');

      data[2].map((user: IOnlineUsers) => {
        if (user.userId === decodedToken?.id && id == data[1]) {
          const sliced = addThreeDotsOnBigMessage(data[0].content);
          setSlicedMessage(sliced);
        }
      });
    });
  };

  const unreadMsgsCounter = (socketRecipient: IOnlineUsers) => {
    socket.on('unreadMsgsCounter', (data, socket) => {
      if (!socketRecipient) return;
      console.log(data[0]);

      if (socketRecipient.socketId === socket) {
        setWsUnreadMessagesLength(data[0] + 1);
      }
    });
  };

  const unreadMsgsCounterInGroup = () => {
    socket.on('unreadMsgsCounterInGroup', (data) => {
      const isMyId = data[0].find(
        (element: { id: number }) => element.id == decodedToken?.id,
      );

      if (isMyId.id == decodedToken?.id) {
        setWsUnreadMessagesInGroupLength(isMyId.unreadMessagesLength + 1);
      }
    });
  };

  const getUserData = async (recipientId: number) => {
    try {
      const response = await axios.get(`user/${recipientId}`);

      setUserRecipient(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        if (!id) return;

        const response = await axios.get(
          `/conversation/show/${decodedToken?.id}/${id}`,
        );

        if (
          response.data[0].Users[0].users_conversations.UserId !==
          decodedToken?.id
        ) {
          setRecipientId(response.data[0].Users[0].users_conversations.UserId);
          getUserData(response.data[0].Users[0].users_conversations.UserId);
        } else {
          setRecipientId(response.data[0].Users[1].users_conversations.UserId);
          getUserData(response.data[0].Users[1].users_conversations.UserId);
        }
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
      newLastMsgInGroup();

      isGroup ? unreadMsgsCounterInGroup() : unreadMsgsCounter(socketRecipient);
    });
  }, [recipientId]);

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

  console.log(userRecipient);

  return (
    <>
      <div>
        <Container
          onClick={() => {
            navigate(`/chat/${id}/${username}?isGroup=${isGroup}`);
          }}
        >
          <DivUser>
            {userRecipient?.image ? (
              <>
                {isGroup ? (
                  <UserAvatar>
                    <Users color="black" />
                  </UserAvatar>
                ) : (
                  <UserImage>
                    <img src={userRecipient.image_url}></img>
                  </UserImage>
                )}
              </>
            ) : (
              <UserAvatar>
                <>
                  {isGroup ? <Users color="black" /> : <User color="black" />}
                </>
              </UserAvatar>
            )}
            <UserNameAndMessage>
              <p className="username">
                {isGroup
                  ? conversation.name === null
                    ? 'Grupo sem nome'
                    : conversation.name
                  : username}
              </p>
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
              wsUnreadMessagesLength > 0 ||
              wsUnreadMessagesInGroupLength > 0) && (
              <MessageCounter>
                <b>
                  <p>
                    {isGroup
                      ? wsUnreadMessageInGroupOrHttp
                      : wsUnreadMessageOrHttp}
                  </p>
                </b>
              </MessageCounter>
            )}
          </DivMessageHourAndCounter>
        </Container>
      </div>
    </>
  );
}

export default ConversationCard;
