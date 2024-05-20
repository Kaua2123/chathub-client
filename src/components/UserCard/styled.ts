import { MessageSquareText, UserRoundPlus } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7rem;
  font-family: Raleway;
`;

export const DivIsOnline = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DivUser = styled.div`
  display: flex;
  gap: 2.5rem;
`;

export const UserAvatar = styled.div`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserData = styled.div`
  display: flex;
  flex-flow: column wrap;

  .is-online {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const DivOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const DivResult = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 3rem;
`;

export const Button = styled.div`
  cursor: pointer;
`;

export const MessageSquareTextIcon = styled(MessageSquareText)`
  &:hover {
    transition: transform 0.3s;

    transform: translateY(-10%);
    stroke: ${({ theme }) => theme.colors.lighterBlue};
  }
`;
export const UserRoundPlusIcon = styled(UserRoundPlus)`
  &:hover {
    transition: transform 0.3s;

    transform: translateY(-10%);
    stroke: ${({ theme }) => theme.colors.lighterBlue};
  }
`;