import styled from 'styled-components';

export const Container = styled.div<{ $isSender?: boolean }>`
  background-color: ${(props) => (props.$isSender ? '#FFFFFF' : '#374050')};
  padding: 2rem;
  position: relative;
  border-radius: 0.9rem;
  width: 28rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  min-width: 28rem;
  cursor: ${(props) => (props.$isSender ? 'pointer' : 'auto')};
  transition: transform 0.3s;

  &:hover {
    transform: ${(props) => (props.$isSender ? 'scale(1.1)' : 'scale(1.0)')};
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
`;

export const UpdatedMessage = styled.div`
  font-family: Raleway;
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: 1.3rem;
`;

export const MessageContent = styled.p<{ $isSender?: boolean }>`
  color: ${(props) => (props.$isSender ? 'black' : '#CCCCCC')};
  font-family: Raleway;
  font-size: 1.8rem;
`;
