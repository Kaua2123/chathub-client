import styled, { keyframes } from 'styled-components';
import { Grab } from 'lucide-react';

export const Container = styled.div<{ $isDragging: boolean }>`
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  min-width: 40rem;
  width: 10rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  border-radius: 1.7rem;
  transition: transform 0.3s;
  cursor: pointer;
  z-index: 0;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.lighterBlue};

    transform: translateY(-4%);
  }

  @media (max-width: 768px) {
    width: auto;
    min-width: 20rem;
    touch-action: ${(props) => (props.$isDragging ? 'none' : 'auto')};
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DivOrdering = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  animation: ${fadeIn} 0.6s;
  p {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
`;

const waving = keyframes` // frames para mexer o icone de mãozinha
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
