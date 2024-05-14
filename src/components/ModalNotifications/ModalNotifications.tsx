import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import NotificationCard from '../NotificationCard/NotificationCard';
import {
  CircleXIcon,
  CloseButton,
  Container,
  Modal,
  BellIcon,
  Div,
  TrashIcon,
  DeleteButton,
  DivNotifications,
} from './styled';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';

export type ModalNotificationsProps = {
  setIsSeeingNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalNotifications({
  setIsSeeingNotification,
}: ModalNotificationsProps) {
  const [notifications, setNotifications] = useState([1, 2, 3, 4]);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over) return;

    if (active.id !== over.id) {
      setNotifications((notifications) => {
        const oldIndex = notifications.indexOf(active.id as number);
        const newIndex = notifications.indexOf(over.id as number);

        localStorage.setItem(
          'notifications',
          JSON.stringify(arrayMove(notifications, oldIndex, newIndex)),
        );
        return arrayMove(notifications, oldIndex, newIndex);
      });
    }
  }

  return (
    <div>
      <Modal>
        <Container>
          <Div>
            <BellIcon size={50} />
            <DeleteButton>
              <TrashIcon size={30} />
            </DeleteButton>
            <CloseButton>
              <CircleXIcon
                onClick={() => setIsSeeingNotification(false)}
                size={20}
                color="white"
              />
            </CloseButton>
          </Div>
          <DivNotifications>
            <DndContext
              onDragEnd={(e) => handleDragEnd(e)}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={notifications}
                strategy={verticalListSortingStrategy}
              >
                {notifications.map((_, i) => {
                  return <NotificationCard key={i} id={i} />;
                })}
              </SortableContext>
            </DndContext>
          </DivNotifications>
        </Container>
      </Modal>
    </div>
  );
}
export default ModalNotifications;
