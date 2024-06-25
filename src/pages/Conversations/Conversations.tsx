/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import {
  Div,
  DivButtons,
  DivConversations,
  OrderConversationsButton,
  WavingGrabHand,
} from './styled';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ConversationCard from '../../components/ConversationCard/ConversationCard';
import Navbar from '../../components/Navbar/Navbar';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Hand } from 'lucide-react';

import axios from '../../services/axios';
import { IConversation } from '../../interfaces/IConversation';
import { useNavigate } from 'react-router-dom';
import { tokenDecoder } from '../../utils/tokenDecoder';

function Conversations() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = useMemo(() => tokenDecoder(token), []);

  const [conversations, setConversations] = useState<IConversation[]>([]);

  const orderedConversationsString = localStorage.getItem('conversations');
  const orderedConversationsArray: IConversation[] | null =
    orderedConversationsString ? JSON.parse(orderedConversationsString) : null;

  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!token) return navigate('/');

    const checkResolution = () => {
      window.screen.width < 768 ? setIsMobile(true) : setIsMobile(false);
    };

    const getUserConversations = async () => {
      try {
        const response = await axios.get(`/conversation/${decodedToken?.id}`);

        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    checkResolution();
    getUserConversations();
  }, [decodedToken?.id]);

  const getConversationsPosition = (id: number) =>
    conversations.findIndex((conversation) => conversation.id === id);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      setConversations((conversations) => {
        const oldIndex = getConversationsPosition(active.id as number);
        const newIndex = getConversationsPosition(over.id as number);

        localStorage.setItem(
          'conversations',
          JSON.stringify(arrayMove(conversations, oldIndex, newIndex)),
        );
        return arrayMove(conversations, oldIndex, newIndex);
      });
    }
  }

  return (
    <div>
      <Navbar />

      <Div>
        <p className="title">Conversas</p>

        {conversations && conversations.length > 0 ? (
          <DivConversations $isMobile={isMobile}>
            <DndContext
              onDragEnd={(e) => handleDragEnd(e)}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={conversations}
                strategy={verticalListSortingStrategy}
              >
                {!orderedConversationsArray &&
                  conversations.map((conversation, index) => (
                    <ConversationCard
                      isDragging={isDragging}
                      key={index}
                      id={conversation.id}
                      conversation={conversation}
                    />
                  ))}

                {orderedConversationsArray &&
                  orderedConversationsArray.map((conversation, index) => (
                    <ConversationCard
                      isDragging={isDragging}
                      key={index}
                      id={conversation.id}
                      conversation={conversation}
                    />
                  ))}
              </SortableContext>
            </DndContext>
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
      <DivButtons>
        <OrderConversationsButton onClick={() => setIsDragging(!isDragging)}>
          {isDragging && <WavingGrabHand />}
          {!isDragging && <Hand />}
        </OrderConversationsButton>
      </DivButtons>

      <BottomMenu />
    </div>
  );
}

export default Conversations;
