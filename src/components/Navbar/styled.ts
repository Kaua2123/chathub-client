import { Bell } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  margin: 5rem;
  margin: 2.5rem;
  padding: 0 4rem;
  position: relative;
  top: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  .logo {
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-10%);
    }
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

export const A = styled.a`
  transition: transform 0.3s;

  &:hover {
    transform: scale(2);
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

export const UserAvatar = styled.div`
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
`;