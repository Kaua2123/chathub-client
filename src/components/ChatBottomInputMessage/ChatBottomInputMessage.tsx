import { Button, Container, Div, Input, SendHorizontalIcon } from './styled';

function ChatBottomInputMessage() {
  return (
    <div>
      <Container>
        <Div>
          <Input type="text" placeholder="Envie algo" />

          <Button>
            <SendHorizontalIcon color="black" />
          </Button>
        </Div>
      </Container>
    </div>
  );
}

export default ChatBottomInputMessage;
