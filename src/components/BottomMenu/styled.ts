import styled from 'styled-components';
import { MessageSquareText, Users, UserRoundX, Settings } from 'lucide-react';

export const MessageSquareTextIcon = styled(MessageSquareText)`
  transition: transform 0.3s;

  &:hover {
    stroke: ${({ theme }) => theme.colors.lighterBlue};
    transform: translateY(-10%);
  }
`;

export const UsersIcon = styled(Users)`
  transition: transform 0.3s;

  &:hover {
    stroke: ${({ theme }) => theme.colors.lighterBlue};
    transform: translateY(-10%);
  }
`;
export const UserRoundXIcon = styled(UserRoundX)`
  transition: transform 0.3s;

  &:hover {
    stroke: ${({ theme }) => theme.colors.lighterBlue};
    transform: translateY(-10%);
  }
`;
export const SettingsIcon = styled(Settings)`
  transition: transform 0.3s;

  &:hover {
    stroke: ${({ theme }) => theme.colors.lighterBlue};
    transform: translateY(-10%);
  }
`;

export const Div = styled.div`
  padding: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 4rem;
`;
