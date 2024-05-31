import { User } from 'lucide-react';
import {
  Container,
  Div,
  DivMessage,
  MessageContent,
  UserAvatar,
} from './styled';
import { useState } from 'react';
import ModalMessageOptions from '../ModalMessageOptions/ModalMessageOptions';

export type MessageProps = {
  isSender?: boolean;
  children: string;
  id: number;
};

function Message({ isSender, children, id }: MessageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      {isModalOpen && (
        <ModalMessageOptions id={id} setIsModalOpen={setIsModalOpen}>
          {children}
        </ModalMessageOptions>
      )}
      <DivMessage $isSender={isSender} onClick={() => setIsModalOpen(true)}>
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
