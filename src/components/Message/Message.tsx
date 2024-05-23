import { User } from 'lucide-react';
import {
  Container,
  Div,
  DivMessage,
  MessageContent,
  UserAvatar,
} from './styled';

export type MessageProps = {
  isSender: boolean;
  children: string;
};

function Message({ isSender, children }: MessageProps) {
  return (
    <div>
      <DivMessage $isSender={isSender}>
        <UserAvatar>
          <User />
        </UserAvatar>
        <Container $isSender={isSender}>
          <Div>
            <MessageContent $isSender={isSender}>{children}</MessageContent>
          </Div>
        </Container>
      </DivMessage>
    </div>
  );
}

export default Message;
