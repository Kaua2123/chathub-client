import styled, { keyframes } from 'styled-components';

const sendingMessage = keyframes`
  0% {
    transform: scale(80%);
  }
  100% {
    transform: scale(100%);
  }
`;

export const Container = styled.div<{
  $isSender?: boolean;
  $isDeleted?: boolean;
}>`
  background-color: ${(props) => (props.$isSender ? '#FFF' : '#374050')};
  padding: 2rem;
  position: relative;
  border-radius: 0.9rem;
  border-top-right-radius: ${(props) => (props.$isSender ? '0px' : 'normal')};
  border-top-left-radius: ${(props) => (props.$isSender ? 'normal' : '0px')};
  width: 28rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  min-width: 28rem;
  animation: ${sendingMessage} 0.3s;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.54);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.54);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.54);

  cursor: ${(props) =>
    props.$isSender && !props.$isDeleted ? 'pointer' : 'auto'};
  transition: transform 0.3s;

  &:hover {
    transform: ${(props) =>
      props.$isSender && !props.$isDeleted ? 'scale(1.1)' : 'scale(1.0)'};
  }
`;

export const Div = styled.div``;

export const UserAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 4.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.2rem;
`;

export const DivMessage = styled.div<{ $isSender?: boolean }>`
  display: flex;
  flex-flow: column wrap;
  margin: 5rem;
  gap: 1.5rem;
  align-items: ${(props) => (props.$isSender ? 'end' : 'start')};

  .username {
    color: ${({ theme }) => theme.colors.darkGray};
    font-style: italic;
    font-family: Raleway;
    font-size: 1.4rem;
  }
`;

export const UpdatedMessage = styled.div<{ $isSender?: boolean }>`
  font-family: Raleway;
  color: ${(props) => (props.$isSender ? 'black' : '#CCCCCC')};
  font-size: 1.3rem;
`;

export const MessageContent = styled.p<{
  $isSender?: boolean;
  $isDeleted?: boolean;
}>`
  color: ${(props) => (props.$isSender ? 'CCCCCC' : 'white')};
  font-family: Raleway;
  font-size: 1.8rem;
  font-style: ${(props) => (props.$isDeleted ? 'italic' : 'normal')};
`;
