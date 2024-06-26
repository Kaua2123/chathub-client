import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftIcon,
  Button,
  Container,
  Div,
  DivConfig,
  DivMessages,
  DivUser,
  EllipsisVerticalIcon,
  Input,
  SendHorizontalIcon,
  TopContainer,
  UserAvatar,
} from './styled';
import { Circle, User, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';
import { handleKeyDown } from '../../utils/handleKeyDown';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import Loading from '../../components/Loading/Loading';
import ChatDropdown from '../../components/ChatDropdown/ChatDropdown';
import ModalAddUsers from '../../components/ModalAddUsers/ModalAddUsers';
import { useQuery } from '../../hooks/useQuery';
import { IConversation } from '../../interfaces/IConversation';
import axios from '../../services/axios';

function Chat() {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const decodedToken = useAuthContext();
  const {
    onlineUsers,
    messages,
    recipientId,
    isUserTyping,
    handleSubmit,
    setMsg,
    handleClickDelete,
  } = useChatContext();

  const query = useQuery();
  const isGroup = query.get('isGroup');

  const [conversationUsersname, setConversationUsersname] = useState<string[]>(
    [],
  );
  const [conversation, setConversation] = useState<IConversation>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAddUsersOpen, setIsModalAddUsersOpen] = useState(false);
  const isOnline = onlineUsers.some((user) => user.userId === recipientId);
  const divMessages = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getUserConversation = async () => {
      try {
        const response = await axios.get(
          `/conversation/show/${decodedToken?.id}/${id}`,
        );

        const conversation = response.data;
        setConversation(conversation);

        const conversationUsers: string[] = conversation[0].Users?.map(
          (user: { username: string }) => user.username,
        );

        setConversationUsersname(conversationUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getUserConversation();
  }, []);

  useEffect(() => {
    if (!divMessages.current) return;

    divMessages.current.scrollTo(0, divMessages.current.scrollHeight);
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2400);
  });

  return (
    <div>
      {isLoading && <Loading />}
      {isDeleting && (
        <ModalDeleting
          handleClickDelete={handleClickDelete}
          setIsDeleting={setIsDeleting}
        />
      )}
      {isModalAddUsersOpen && (
        <ModalAddUsers
          conversationId={id}
          decodedToken={decodedToken}
          setIsCreatingGroup={setIsModalAddUsersOpen}
        />
      )}
      <TopContainer>
        <DivUser>
          <ArrowLeftIcon
            onClick={() => {
              navigate('/conversations');
            }}
          />
          <UserAvatar>
            <>
              {isGroup === 'true' ? (
                <Users color="black" />
              ) : (
                <User color="black" />
              )}
            </>
          </UserAvatar>
          <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
            <p>
              {isGroup === 'true'
                ? conversation?.name
                  ? conversation.name
                  : 'Grupo sem nome'
                : username}
            </p>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {isGroup === 'true' ? (
                conversationUsersname.map((username) => `${username},  `)
              ) : (
                <>
                  <Circle
                    size={16}
                    color="inherit"
                    fill={isOnline ? '#629B44' : 'gray'}
                  />
                  <p className="is-online" style={{ fontSize: '1.4rem' }}>
                    {isOnline ? 'Online' : 'Offline'}
                  </p>
                </>
              )}
            </div>
          </div>
        </DivUser>

        <DivConfig>
          <EllipsisVerticalIcon onClick={() => setIsMenuOpen(true)} />
          {isMenuOpen && (
            <ChatDropdown
              setIsMenuOpen={setIsMenuOpen}
              setIsDeleting={setIsDeleting}
              setIsModalAddUsersOpen={setIsModalAddUsersOpen}
            />
          )}
          {/* <TrashIcon onClick={() => setIsDeleting(true)} /> */}
        </DivConfig>
      </TopContainer>

      <DivMessages ref={divMessages}>
        {messages.map((message, index) => (
          <Message
            id={message.id}
            key={index}
            isUpdated={message.is_updated}
            isDeleted={message.is_deleted}
            isSender={
              decodedToken?.id == message.UserId
                ? message.is_sender
                : !message.is_sender
            }
            username={username}
            isReadBy={message.is_read_by}
            isGroup={isGroup}
          >
            {message.content}
          </Message>
        ))}
      </DivMessages>

      <Container>
        {isUserTyping && (
          <p className="is-typing">
            <b>{username}</b> está digitando...
          </p>
        )}
        <Div>
          <Input
            className="input"
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Envie algo"
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
          />

          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            <SendHorizontalIcon color="black" />
          </Button>
        </Div>
      </Container>
    </div>
  );
}

export default Chat;
