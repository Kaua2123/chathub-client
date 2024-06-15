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
  const userId = decodedToken?.id;

  const [username, setUsername] = useState('');
  const [lastMessage, setLastMessage] = useState<IMessage>();
  const lastMessageContent =
    lastMessage?.UserId === userId
      ? `Você: ${lastMessage?.content}`
      : lastMessage?.content;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const addDotsOnBigMessage = () => {
      if (lastMessageContent && lastMessageContent?.length >= 53) {
        console.log('tome: ', lastMessageContent?.slice(51));
      }
    };

    const checkUserName = () => {
      if (conversation.Users[0].users_conversations.UserId != userId) {
        setUsername(conversation.Users[0].username);
      } else {
        setUsername(conversation.Users[1].username);
      }
    };

    checkUserName();
    addDotsOnBigMessage();
  }, [conversation.Users, userId]);

  useEffect(() => {
    const getLastMessageOfAConversation = async () => {
      try {
        const response = await axios.get(
          `/messages/getLastMessage/${conversation.id}`,
        );

        setLastMessage(response.data);
      } catch (error) {
        console.log('an error ocurred: ', error);
      }
    };
    getLastMessageOfAConversation();
  }, []);

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
                  {lastMessage ? lastMessageContent : 'Comece a conversar!'}
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
                  {lastMessage ? lastMessageContent : 'Comece a conversar!'}
                </p>
              </UserNameAndMessage>
            </DivUser>
            <DivMessageHourAndCounter>
              <MessageHour>
                <b>
                  <p>08:40</p>
                </b>
              </MessageHour>
              <MessageCounter>
                <b>
                  <p>24</p>
                </b>
              </MessageCounter>
            </DivMessageHourAndCounter>
          </Container>
        </div>
      )}
    </>
  );
}

export default ConversationCard;
