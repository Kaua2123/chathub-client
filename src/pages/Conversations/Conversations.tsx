/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { Div, DivConversations } from './styled';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ConversationCard from '../../components/ConversationCard/ConversationCard';
import Navbar from '../../components/Navbar/Navbar';

import axios from '../../services/axios';
import { IConversation } from '../../interfaces/IConversation';
import { useNavigate } from 'react-router-dom';
import { tokenDecoder } from '../../utils/tokenDecoder';

function Conversations() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = useMemo(() => tokenDecoder(token), []);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const orderedConversationsString = localStorage.getItem('conversations');
  const orderedConversationsArray: IConversation[] | null =
    orderedConversationsString ? JSON.parse(orderedConversationsString) : null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!token) return navigate('/');

    const getUserConversations = async () => {
      try {
        const response = await axios.get(`/conversation/${decodedToken?.id}`);

        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserConversations();
  }, [decodedToken?.id]);

  return (
    <div>
      <Navbar />

      <Div>
        <p className="title">Conversas</p>

        {conversations && conversations.length > 0 ? (
          <DivConversations $isMobile={isMobile}>
            {!orderedConversationsArray &&
              conversations.map((conversation, index) => (
                <ConversationCard
                  key={index}
                  id={conversation.id}
                  conversation={conversation}
                />
              ))}

            {orderedConversationsArray &&
              orderedConversationsArray.map((conversation, index) => (
                <ConversationCard
                  key={index}
                  id={conversation.id}
                  conversation={conversation}
                />
              ))}
          </DivConversations>
        ) : (
          <div
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              justifyContent: 'center',
              alignItems: 'center',
              height: '40vh',
            }}
          >
            <h4>Não encontramos conversas por aqui.</h4>
          </div>
        )}
      </Div>

      <BottomMenu />
    </div>
  );
}

export default Conversations;
