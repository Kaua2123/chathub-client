import { useState } from 'react';
import { CirclePlusIcon, Div, DivConversations, FixedButton } from './styled';
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

function Conversations() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [conversations, setConversations] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      setConversations((conversations) => {
        const oldIndex = conversations.indexOf(active.id as number);
        const newIndex = conversations.indexOf(over.id as number);

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
        <p>Conversas</p>

        <DivConversations>
          <DndContext
            onDragEnd={(e) => handleDragEnd(e)}
            collisionDetection={closestCenter}
          >
            <SortableContext
              items={conversations}
              strategy={horizontalListSortingStrategy}
            >
              {conversations.map((id) => (
                <ConversationCard key={id} id={id} />
              ))}
            </SortableContext>
          </DndContext>
        </DivConversations>
      </Div>
      <FixedButton onClick={() => setIsCreatingGroup(true)}>
        <CirclePlusIcon />
      </FixedButton>

      <BottomMenu />
    </div>
  );
}

export default Conversations;
