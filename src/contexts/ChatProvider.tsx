import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { IMessage } from '../interfaces/IMessage';
import { IOnlineUsers } from '../interfaces/IOnlineUsers';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { ChatContext } from './contexts';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export type ChatContextProps = {
  children: JSX.Element;
};

export type ContextData = {
  onlineUsers: IOnlineUsers[];
  isUserTyping: boolean;
  messages: IMessage[];
  recipientId: number;
  handleSubmit: () => Promise<void>;
  setMsg: React.Dispatch<React.SetStateAction<string | boolean>>;
};

function ChatProvider({ children }: ChatContextProps) {
  const [socketInstance] = useState(socket);
  const { id } = useParams();
  const decodedToken = useAuthContext();

  const [isUserTyping, setIsUserTyping] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [msg, setMsg] = useState<string | boolean>('');
  const [onlineUsers, setOnlineUsers] = useState<IOnlineUsers[]>([]);

  //   const [isDeleting, setIsDeleting] = useState(false);
  const [recipientId, setRecipientId] = useState(0);

  useEffect(() => {
    const getRecipientId = async () => {
      try {
        if (!id) console.log('undefined id - useParams');

        const response = await axios.get(
          `/conversation/show/${decodedToken.id}/${id}`,
        );

        response.data[0].Users[0].users_conversations.UserId !== decodedToken.id
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
      } catch (error) {
        console.log(error);
      }
    };

    getMessagesOfAConversation();
    getRecipientId();
  }, [id]);

  useEffect(() => {
    if (!socketInstance) return;

    socketInstance.on('receivedMsg', (objMsg: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, objMsg]);
    });

    socketInstance.on('userTyping', (isTyping: boolean) => {
      setIsUserTyping(isTyping);
    });

    socketInstance.emit('newUser', decodedToken.id);
    socketInstance.on('onlineUsers', (onlineUsers) => {
      console.log('onlineUsers ', onlineUsers);
      setOnlineUsers(onlineUsers);
    });

    return () => {
      socketInstance.off('receivedMsg'); // desligando a conexão quando o componente for desmontado
      socketInstance.off('userTyping');
      socketInstance.off('onlineUsers');
    };
  }, [socketInstance]);

  useEffect(() => {
    if (!socketInstance) return;
    msg
      ? socketInstance.emit('typing', true)
      : socketInstance.emit('typing', false);
  }, [msg]);

  const handleSubmit = async () => {
    try {
      if (!msg || !socketInstance) return;
      const input: HTMLInputElement | null = document.querySelector('.input');

      const response = await axios.post('/messages/create', {
        content: msg,
        is_sender: true,
        ConversationId: id,
        UserId: decodedToken.id,
      });

      const objMsg = response.data;
      setMessages([...messages, objMsg]);

      socketInstance.emit('msg', objMsg);

      if (input) input.value = '';

      setMsg(false);
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
          setMsg,
        }}
      >
        {children}
      </ChatContext.Provider>
    </div>
  );
}

export default ChatProvider;
