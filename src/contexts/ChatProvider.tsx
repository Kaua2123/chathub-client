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

export type ChatProviderProps = {
  children: JSX.Element;
};

export type ContextData = {
  onlineUsers: IOnlineUsers[];
  isUserTyping: boolean;
  messages: IMessage[];
  recipientId: number;
  handleSubmit: () => Promise<void>;
  handleClickDelete: () => Promise<void>;
  setMsg: React.Dispatch<React.SetStateAction<string | boolean>>;
};

function ChatProvider({ children }: ChatProviderProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const decodedToken = useAuthContext();
  const socket = useSocketContext();

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [msg, setMsg] = useState<string | boolean>('');
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUsers[]>([]);
  const [recipientId, setRecipientId] = useState(0);

  const readUnreadMessages = async () => {
    try {
      await axios.put(
        `/messages/readAllUnreadMessages/${id}/${decodedToken?.id}`,
      );
    } catch (error) {
      console.log('an error ocurred');
    }
  };

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        if (!id) console.log('undefined id - useParams');

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

    const getMessagesOfAConversation = async () => {
      try {
        const response = await axios.get(`/messages/getMessages/${id}`);
        setMessages(response.data);
        readUnreadMessages();
      } catch (error) {
        console.log(error);
      }
    };

    getMessagesOfAConversation();
    getRecipientId();
  }, [id]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receivedMsg', (objMsg: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, objMsg]);
      readUnreadMessages();
    });

    socket.on('userTyping', (isTyping: boolean) => {
      setIsUserTyping(isTyping);
    });

    socket.emit('newUser', decodedToken?.id);
    socket.on('onlineUsers', (onlineUsers) => {
      console.log('onlineUsers ', onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socket.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
      socket.off('userTyping');
      socket.off('onlineUsers');
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    msg ? socket.emit('typing', true) : socket.emit('typing', false);
  }, [msg]);

  const handleSubmit = async () => {
    try {
      if (!msg || !socket) return;
      const input: HTMLInputElement | null = document.querySelector('.input');

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        is_read_by: [decodedToken?.id?.toString()],
        ConversationId: id,
        UserId: decodedToken?.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      socket.emit('msg', objMsg);

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
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
}

export default ChatProvider;
