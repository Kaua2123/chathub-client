import ChatBar from '../../components/ChatBar/ChatBar';
import ChatBottomInputMessage from '../../components/ChatBottomInputMessage.tsx/ChatBottomInputMessage';

function Chat() {
  //   const { id } = useParams();

  return (
    <div>
      <ChatBar />

      <ChatBottomInputMessage />
    </div>
  );
}

export default Chat;
