import { useEffect, useState } from 'react';
import {
  CirclePlusIcon,
  Div,
  DivButtons,
  DivConversations,
  FixedButton,
  OrderConversationsButton,
  WavingGrabHand,
} from './styled';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ConversationCard from '../../components/ConversationCard/ConversationCard';
import Navbar from '../../components/Navbar/Navbar';
import ModalCreatingGroup from '../../components/ModalCreatingGroup/ModalCreatingGroup';

import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Hand } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

import axios from '../../services/axios';
import { IToken } from '../../interfaces/IToken';
import { IConversation } from '../../interfaces/IConversation';

function Conversations() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const [conversations, setConversations] = useState<IConversation[]>([]);

  const orderedConversationsString = localStorage.getItem('conversations');
  const orderedConversationsArray: IConversation[] | null =
    orderedConversationsString ? JSON.parse(orderedConversationsString) : null;

  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const token = localStorage.getItem('token');
  const decodedToken: IToken = jwtDecode(token as string);

  useEffect(() => {
    const checkResolution = () => {
      if (window.screen.width < 768) setIsMobile(true);
    };

    const getUserConversations = async () => {
      try {
        const response = await axios.get(`/conversation/${decodedToken.id}`);

        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    checkResolution();
    getUserConversations();
  }, [decodedToken.id]);

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

      {isCreatingGroup && (
        <ModalCreatingGroup setIsCreatingGroup={setIsCreatingGroup} />
      )}

      <Div>
        <p className="title">Conversas</p>

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
                    userId={decodedToken.id}
                  />
                ))}

              {orderedConversationsArray &&
                orderedConversationsArray.map((conversation, index) => (
                  <ConversationCard
                    isDragging={isDragging}
                    key={index}
                    id={conversation.id}
                    conversation={conversation}
                    userId={decodedToken.id}
                  />
                ))}
              {/* 
              {conversations.map((conversation, index) => (
                <ConversationCard
                  isDragging={isDragging}
                  key={index}
                  id={conversation.id}
                  conversation={conversation}
                  userId={decodedToken.id}
                />
              ))} */}
            </SortableContext>
          </DndContext>
        </DivConversations>
      </Div>
      <DivButtons>
        <FixedButton onClick={() => setIsCreatingGroup(true)}>
          <CirclePlusIcon />
        </FixedButton>
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
