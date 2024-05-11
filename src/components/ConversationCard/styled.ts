import styled from 'styled-components';
import { EllipsisVertical } from 'lucide-react';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  min-width: 40rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  border-radius: 1.7rem;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.lighterBlue};

    transform: translateY(-4%);
  }
`;

export const DivUser = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: 2.4rem;
`;

export const UserAvatar = styled.div`
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
`;

export const UserNameAndMessage = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;

  .username {
    font-size: 2rem;
  }
  .user-message {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const DivConfig = styled.div``;

export const EllipsisVerticalIcon = styled(EllipsisVertical)`
  transition: transform 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;
