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
import { Circle, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';
import { handleKeyDown } from '../../utils/handleKeyDown';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import Loading from '../../components/Loading/Loading';
import ChatDropdown from '../../components/ChatDropdown/ChatDropdown';
import ModalAddUsers from '../../components/ModalAddUsers/ModalAddUsers';

function Chat() {
  const { username } = useParams();
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

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAddUsersOpen, setIsModalAddUsersOpen] = useState(false);
  const isOnline = onlineUsers.some((user) => user.userId === recipientId);
  const divMessages = useRef<HTMLDivElement | null>(null);

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
            <User color="black" />
          </UserAvatar>
          <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
            <p>{username}</p>
            <div
              style={{
                display: 'flex',
                flexFlow: 'row wrap',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Circle
                size={16}
                color="inherit"
                fill={isOnline ? '#629B44' : 'gray'}
              />
              <p className="is-online" style={{ fontSize: '1.4rem' }}>
                {isOnline ? 'Online' : 'Offline'}
              </p>
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
