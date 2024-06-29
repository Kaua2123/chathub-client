import { useEffect, useState } from 'react';
import { IMessage } from '../interfaces/IMessage';
import { IOnlineUsers } from '../interfaces/IOnlineUsers';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../services/axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { ChatContext } from './contexts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useSocketContext } from '../hooks/useSocketContext';
import { IConversation, User } from '../interfaces/IConversation';
import { useQuery } from '../hooks/useQuery';

export type ChatProviderProps = {
  children: JSX.Element;
};

export type ContextData = {
  onlineUsers: IOnlineUsers[];
  isUserTyping: boolean;
  messages: IMessage[];
  sender: User | undefined;
  recipientId: number;
  handleSubmit: () => Promise<void>;
  handleClickDelete: () => Promise<void>;
  setMsg: React.Dispatch<React.SetStateAction<string | boolean>>;
  conversationUsersname: string[];
  conversation: IConversation | undefined;
  isGroup: string | null;
  wsUsername: string;
};

function ChatProvider({ children }: ChatProviderProps) {
  const { id } = useParams();
  const query = useQuery();
  const isGroup = query.get('isGroup');

  const navigate = useNavigate();
  const decodedToken = useAuthContext();
  const socket = useSocketContext();

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [conversationUsersname, setConversationUsersname] = useState<string[]>(
    [],
  );

  const [conversation, setConversation] = useState<IConversation>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [unreadMessagesLength, setUnreadMessagesLength] = useState(0);
  const [msg, setMsg] = useState<string | boolean>('');
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUsers[]>([]);
  const [recipientId, setRecipientId] = useState(0);
  const [recipientUsers, setRecipientUsers] = useState<User[]>([]);
  const [sender, setSender] = useState<User | undefined>();
  const [wsUsername, setWsUsername] = useState('');

  const socketRecipient = onlineUsers.find(
    (user) => user.userId === recipientId,
  );

  const socketRecipients = recipientUsers.map((userRecipient) =>
    onlineUsers.find((user) => user.userId === userRecipient.id),
  );

  const readUnreadMessages = async () => {
    try {
      const response = await axios.put(
        `/messages/readAllUnreadMessages/${id}/${decodedToken?.id}`,
      );

      const unreadMessages: IMessage[] = response.data;

      socket.emit('readMsg', unreadMessages);
    } catch (error) {
      console.log('an error ocurred', error);
    }
  };

  useEffect(() => {
    const getUnreadMessages = async () => {
      try {
        const response = await axios.get(
          `/messages/getUnreadMessages/${id}/${recipientId}`,
        );

        setUnreadMessagesLength(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getUnreadMessages();
  }, [messages]);

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        if (!id) return;

        const response = await axios.get(
          `/conversation/show/${decodedToken?.id}/${id}`,
        );

        const conversation: IConversation = response.data[0];

        if (isGroup === 'false') {
          conversation.Users[0].users_conversations.UserId !== decodedToken?.id
            ? setRecipientId(
                response.data[0].Users[0].users_conversations.UserId,
              )
            : setRecipientId(
                response.data[0].Users[1].users_conversations.UserId,
              );
        } else {
          const recipientUsers = conversation.Users.filter(
            (user) => user.id !== decodedToken?.id,
          );

          const sender = conversation.Users.find(
            (user) => user.id === decodedToken?.id,
          );

          setSender(sender);

          setRecipientUsers(recipientUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };

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

    const getMessagesOfAConversation = async () => {
      try {
        const response = await axios.get(`/messages/getMessages/${id}`);
        setMessages(response.data);
        readUnreadMessages();
      } catch (error) {
        console.log(error);
      }
    };

    getUserConversation();
    getMessagesOfAConversation();
    getRecipientId();
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receivedMsg', (data, socket) => {
      console.log('receivedMsg chamad');
      if (socketRecipient?.socketId === socket) {
        setMessages((prevMessages) => [...prevMessages, data[0]]);
      }

      readUnreadMessages();
    });

    socket.on('receivedMsgInGroup', (data) => {
      console.log('receivedMsg IN GROUP chamad');

      const isRecipient = data[1].some(
        (user: IOnlineUsers) => user.userId === decodedToken?.id,
      );

      if (isRecipient) {
        setMessages((prevMessages) => [...prevMessages, data[0]]);
        console.log('setando mensagem...');
      }

      // ta mapeando e setando uma nova mensagem toda vez que satisfaz a condiçao (padrao do map)
      //  talvez iterar e no final retornar UM booleano, dizendo se TODAS as condições pra TODOS os indices
      // de um array são satisfeitas. e com base nesse booleano UNICO, emitir a mensagem

      readUnreadMessages();
    });

    socket.on('userTypingInGroup', (data) => {
      setWsUsername(data[2]);
      data[1].map((user: IOnlineUsers) => {
        if (user.userId === decodedToken?.id) setIsUserTyping(data[0]);
      });
    });

    socket.on('userTyping', (data, socket) => {
      if (socketRecipient?.socketId === socket) {
        setIsUserTyping(data[0]);
      }
    });

    socket.emit('newUser', decodedToken?.id);
    socket.on('onlineUsers', (onlineUsers) => {
      console.log('onlineUsers ', onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socket.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
      socket.off('receivedMsgInGroup');
      socket.off('userTyping');
      socket.off('userTypingInGroup');
      socket.off('onlineUsers');
    };
  }, [socket, socketRecipient?.socketId]);

  useEffect(() => {
    if (!socket) return;

    msg
      ? socket.emit('typing', true, socketRecipient?.socketId)
      : socket.emit('typing', false, socketRecipient?.socketId);

    msg
      ? socket.emit('typingInGroup', true, socketRecipients, sender?.username)
      : socket.emit('typingInGroup', false, socketRecipients, sender?.username);
  }, [msg]);

  const handleSubmit = async () => {
    try {
      if (!msg || !socket) return;
      const input: HTMLInputElement | null = document.querySelector('.input');

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        is_read_by: decodedToken?.id?.toString(),
        username: decodedToken?.username,
        ConversationId: id,
        UserId: decodedToken?.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      if (isGroup === 'true') {
        socket.emit(
          'msgInGroup',
          objMsg,
          socketRecipients,
          decodedToken?.username,
        );
      } else {
        socket.emit('msg', objMsg, socketRecipient?.socketId);
      }

      socket.emit(
        'unreadMsgs',
        unreadMessagesLength,
        socketRecipient?.socketId,
      );
      socket.emit('lastMsg', objMsg, socketRecipient?.socketId);

      // const unreadMsgsLength = getUnreadMessages();

      if (input) input.value = '';

      setMsg(false);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  const handleClickDelete = async () => {
    try {
      await axios.delete(`/conversation/delete/${id}`);

      localStorage.removeItem('conversations');
      navigate('/conversations');

      toast.success(`Você deletou essa conversa.`);
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    }
  };

  return (
    <div>
      <ChatContext.Provider
        value={{
          onlineUsers,
          isUserTyping,
          messages,
          recipientId,
          handleSubmit,
          handleClickDelete,
          setMsg,
          conversation,
          conversationUsersname,
          isGroup,
          sender,
          wsUsername,
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
}

export default ChatProvider;
