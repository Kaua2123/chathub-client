import { CirclePlus } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  position: relative;
  color: white;
  max-width: 120rem;
  margin: 0 auto;

  p {
    font-size: 4rem;
    font-family: 'Montserrat';
  }
`;

export const DivConversations = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 3.4rem;
  height: 55vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.7rem;
  }
`;

export const FixedButton = styled.button`
  position: fixed;
  right: 0;
  margin-right: 5rem;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
  cursor: pointer;
  &:hover {
    transform: translateY(-5%);

    & svg {
      // stroke para alterar a cor das linhas do ícone
      stroke: ${({ theme }) => theme.colors.lighterBlue};
    }
  }
`;

export const OrderConversationsButton = styled.button`
  position: fixed;
  margin-left: 5rem;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 1.7rem;
  font-family: Raleway;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

export const CirclePlusIcon = styled(CirclePlus)``;
