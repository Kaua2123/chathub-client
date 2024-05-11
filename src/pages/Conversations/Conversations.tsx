import BottomMenu from '../../components/BottomMenu/BottomMenu';
import ConversationCard from '../../components/ConversationCard/ConversationCard';
import Navbar from '../../components/Navbar/Navbar';
import { Div, DivConversations } from './styled';

function Conversations() {
  return (
    <div>
      <Navbar />

      <Div>
        <p>Conversas</p>

        <DivConversations>
          {Array.from({ length: 3 }).map((_, i) => {
            return <ConversationCard key={i}></ConversationCard>;
          })}
        </DivConversations>
      </Div>
      <BottomMenu />
    </div>
  );
}

export default Conversations;
