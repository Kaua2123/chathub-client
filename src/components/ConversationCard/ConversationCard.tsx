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
  const [lastMessage, setLastMessage] = useState('');
  const [slicedMessage, setSlicedMessage] = useState('');
  console.log(slicedMessage);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    const addThreeDotsOnBigMessage = () => {
      if (lastMessage.length > 50) {
        const sliced = lastMessage.slice(0, 53);
        const slicedWithDots = `${sliced}...`;
        setSlicedMessage(slicedWithDots);
        console.log(lastMessage, sliced);
      } else {
        setSlicedMessage(lastMessage);
      }
    };

    addThreeDotsOnBigMessage();
  }, [lastMessage]);

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
        lastMsg.UserId === userId
          ? setLastMessage(`Você: ${lastMsg.content}`)
          : setLastMessage(lastMsg.content);
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
                  {lastMessage ? slicedMessage : 'Comece a conversar!'}
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
                  {lastMessage ? slicedMessage : 'Comece a conversar!'}
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
