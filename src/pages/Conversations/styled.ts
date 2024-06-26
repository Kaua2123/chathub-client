import { CirclePlus, Grab } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

export const Div = styled.div`
  position: relative;
  color: white;
  max-width: 120rem;
  margin: 0 auto;

  p {
    font-size: 1.5rem;
    font-family: 'Montserrat';
  }

  .title {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    min-height: 60vh;
    margin: 2rem;
    .title {
      font-size: 3rem;
    }
  }
`;

export const DivConversations = styled.div<{ $isMobile?: boolean }>`
  display: flex;
  padding: ${(props) => (props.$isMobile ? '0px' : '2rem')};
  flex-flow: ${(props) => (props.$isMobile ? 'row wrap' : 'column')};
  justify-content: ${(props) => (props.$isMobile ? 'center' : 'normal')};
  align-items: ${(props) => (props.$isMobile ? 'center' : 'normal')};
  gap: 3rem;
  margin-top: 3.4rem;
  height: 55vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.7rem;
  }
`;

export const DivButtons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  background-color: inherit;
  align-items: center;
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

  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    right: 0;
  }
`;

export const OrderConversationsButton = styled.button`
  position: fixed;
  left: 0;
  margin-left: 5rem;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 100%;
  font-family: Raleway;
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

  @media (max-width: 768px) {
    position: fixed;
    bottom: 100px;
    left: 0;
  }
`;

export const CirclePlusIcon = styled(CirclePlus)``;

const waving = keyframes`
  0% { transform: rotate(0deg); }
  5% { transform: rotate(3deg); }
  10% { transform: rotate(7deg); }
  15% { transform: rotate(10deg); }
  20% { transform: rotate(13deg); }
  25% { transform: rotate(15deg); }
  30% { transform: rotate(13deg); }
  35% { transform: rotate(10deg); }
  40% { transform: rotate(7deg); }
  45% { transform: rotate(3deg); }
  50% { transform: rotate(0deg); }
  55% { transform: rotate(-3deg); }
  60% { transform: rotate(-7deg); }
  65% { transform: rotate(-10deg); }
  70% { transform: rotate(-13deg); }
  75% { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`;

export const WavingGrabHand = styled(Grab)`
  animation: ${waving} 1s infinite;
`;
