import { useEffect, useState } from 'react';
import {
  CirclePlusIcon,
  Div,
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
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Hand } from 'lucide-react';

function Conversations() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [conversations, setConversations] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const orderedConversationsString = localStorage.getItem('conversations');
  const orderedConversationsArray: number[] | null = orderedConversationsString
    ? JSON.parse(orderedConversationsString)
    : null;
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkResolution() {
      if (window.screen.width < 768) setIsMobile(true);
    }

    checkResolution();
  });

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      setConversations((conversations) => {
        const oldIndex = conversations.indexOf(active.id as number);
        const newIndex = conversations.indexOf(over.id as number);

        localStorage.setItem(
          'conversations',
          JSON.stringify(arrayMove(conversations, oldIndex, newIndex)),
        );
        return arrayMove(conversations, oldIndex, newIndex);
      });
    }
  }

  console.log(isMobile);

  return (
    <div>
      <Navbar />

      {isCreatingGroup && (
        <ModalCreatingGroup setIsCreatingGroup={setIsCreatingGroup} />
      )}

      <Div>
        <p className="title">Conversas</p>

        <DivConversations>
          <DndContext
            onDragEnd={(e) => handleDragEnd(e)}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={conversations}
              strategy={
                isMobile
                  ? verticalListSortingStrategy
                  : horizontalListSortingStrategy
              }
            >
              {!orderedConversationsArray &&
                conversations.map((id) => (
                  <ConversationCard isDragging={isDragging} key={id} id={id} />
                ))}

              {orderedConversationsArray &&
                orderedConversationsArray.map((id) => (
                  <ConversationCard isDragging={isDragging} key={id} id={id} />
                ))}
            </SortableContext>
          </DndContext>
        </DivConversations>
      </Div>
      <FixedButton onClick={() => setIsCreatingGroup(true)}>
        <CirclePlusIcon />
      </FixedButton>
      <OrderConversationsButton onClick={() => setIsDragging(!isDragging)}>
        {isDragging && <WavingGrabHand />}
        {!isDragging && <Hand />}
      </OrderConversationsButton>

      <BottomMenu />
    </div>
  );
}

export default Conversations;
