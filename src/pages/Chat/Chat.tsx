import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftIcon,
  Button,
  Container,
  Div,
  DivConfig,
  DivData,
  DivMessages,
  DivUser,
  EllipsisVerticalIcon,
  Input,
  SendHorizontalIcon,
  TopContainer,
  UserAvatar,
  UserImage,
} from './styled';
import { Check, Circle, Pen, User, Users } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatContext } from '../../hooks/useChatContext';
import { handleKeyDown } from '../../utils/handleKeyDown';
import ModalDeleting from '../../components/ModalDeleting/ModalDeleting';
import Message from '../../components/Message/Message';
import Loading from '../../components/Loading/Loading';
import ChatDropdown from '../../components/ChatDropdown/ChatDropdown';
import ModalAddUsers from '../../components/ModalAddUsers/ModalAddUsers';
import ModalUsersInGroup from '../../components/ModalUsersInGroup/ModalUsersInGroup';
import axios from '../../services/axios';
import { toast } from 'sonner';

function Chat() {
  const { id, username } = useParams();
  const navigate = useNavigate();
  const decodedToken = useAuthContext();
  const {
    onlineUsers,
    messages,
    recipientId,
    recipientUsers,
    isUserTyping,
    handleSubmit,
    setMsg,
    handleClickDelete,
    conversationUsersname,
    conversationName,
    isGroup,
    wsUsername,
    userRecipient,
  } = useChatContext();

  const [name, setName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [ísUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalAddUsersOpen, setIsModalAddUsersOpen] = useState(false);
  const [isModalUsersInGroupOpen, setIsModalUsersInGroupOpen] = useState(false);
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

  const updateGroupName = async () => {
    try {
      if (!name) return;

      await axios.put(`/conversation/updateName/${id}`, {
        name,
      });

      toast.success('Nome do grupo atualizado.');
    } catch (error) {
      console.log(error);
    }
  };

  const hasGroupName = conversationName ? conversationName : 'Grupo sem nome';

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
      {isModalUsersInGroupOpen && (
        <ModalUsersInGroup
          conversationId={id}
          decodedToken={decodedToken}
          setIsCreatingGroup={setIsModalUsersInGroupOpen}
        />
      )}
      <TopContainer>
        <DivUser>
          <ArrowLeftIcon
            onClick={() => {
              navigate('/conversations');
            }}
          />
          {userRecipient?.image ? (
            <>
              {isGroup === 'true' ? (
                <Users color="black" />
              ) : (
                <UserImage>
                  <img src={userRecipient.image_url} />
                </UserImage>
              )}
            </>
          ) : (
            <UserAvatar>
              <>
                {isGroup === 'true' ? (
                  <Users color="black" />
                ) : (
                  <User color="black" />
                )}
              </>
            </UserAvatar>
          )}

          <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
            <DivData>
              {ísUpdating ? (
                <input
                  type="text"
                  placeholder="Nome do grupo..."
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p>{isGroup === 'true' ? hasGroupName : username}</p>
              )}

              <button onClick={() => setIsUpdating(!ísUpdating)}>
                {isGroup === 'true' &&
                  (!ísUpdating ? (
                    <Pen size={16} color="white" />
                  ) : (
                    <Check
                      size={16}
                      color="#51CC17"
                      onClick={updateGroupName}
                    />
                  ))}
              </button>
            </DivData>
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
              isGroup={isGroup}
              setIsMenuOpen={setIsMenuOpen}
              setIsDeleting={setIsDeleting}
              setIsModalAddUsersOpen={setIsModalAddUsersOpen}
              setIsModalUsersInGroupOpen={setIsModalUsersInGroupOpen}
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
            username={message.username}
            isReadBy={message.is_read_by.replaceAll('"', '').split(',')}
            isGroup={isGroup}
            recipientId={recipientId}
            recipientUsers={recipientUsers}
          >
            {message.content}
          </Message>
        ))}
      </DivMessages>

      <Container>
        {isUserTyping && (
          <p className="is-typing">
            <b>{isGroup === 'true' ? wsUsername : username}</b> está
            digitando...
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
