import {
  Container,
  Div,
  Input,
  SendHorizontalIcon,
  SendMessage,
} from './styled';

function ChatBottomInputMessage() {
  return (
    <div>
      <Container>
        <Div>
          <Input type="text" placeholder="Envie algo" />
          <SendMessage>
            <SendHorizontalIcon color="black" />
          </SendMessage>
        </Div>
      </Container>
    </div>
  );
}

export default ChatBottomInputMessage;
