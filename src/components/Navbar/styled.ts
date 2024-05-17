import { Bell, Circle } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  margin: 2.5rem;
  padding: 0 4rem;
  z-index: 2;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    .logo {
      display: none;
    }
    left: 5rem;
  }
`;

export const UserDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3.4rem;

  .bell-icon {
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-10%);
    }
  }
`;

export const DivNotification = styled.div`
  position: relative;
  padding: 0.2rem;
`;

export const A = styled.a`
  transition: transform 0.3s;

  &:hover {
    transform: scale(2);
  }
`;

export const UserAvatar = styled.div`
  .profile-link {
    border: 1px solid white;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    cursor: pointer;
    &:hover {
      transform: translateY(-10%);

      & svg {
        // stroke para alterar a cor das linhas do ícone
        stroke: ${({ theme }) => theme.colors.lighterBlue};
      }
    }
  }
`;

export const Button = styled.button`
  font-family: Raleway;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: inherit;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10%);
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;

export const BellIcon = styled(Bell)`
  // para mudar a cor das linhas do icone
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    stroke: ${({ theme }) => theme.colors.lighterBlue};
    transform: translateY(-10%);
  }
`;

export const CircleIcon = styled(Circle)`
  transition: transform 0.3s;
  position: absolute;
  bottom: 0;
  left: 1.7rem;
  right: 0;
  top: 1.7rem;
`;
