import { useState } from 'react';
import { CirclePlusIcon, Div, DivConversations, FixedButton } from './styled';
import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ConversationCard from '../../components/ConversationCard/ConversationCard';
import Navbar from '../../components/Navbar/Navbar';
import ModalCreatingGroup from '../../components/ModalCreatingGroup/ModalCreatingGroup';

function Conversations() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  return (
    <div>
      <Navbar />

      {isCreatingGroup && (
        <ModalCreatingGroup setIsCreatingGroup={setIsCreatingGroup} />
      )}

      <Div>
        <p>Conversas</p>

        <DivConversations>
          {Array.from({ length: 22 }).map((_, i) => {
            return <ConversationCard id={i} key={i}></ConversationCard>;
          })}
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
