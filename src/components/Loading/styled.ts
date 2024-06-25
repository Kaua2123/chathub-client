import { MessageCircle } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const opening = keyframes`
  0% {
    transform: scale(60%);
  }
  100% {
    transform: scale(100%);
  }

`;

const iconAnimation = keyframes`
    0% {transform: translateY(-10%)}    
`;

export const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  color: ${({ theme }) => theme.colors.white};
  font-family: Raleway;
  font-size: 3rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  padding: 9rem;
  border-radius: 2rem;
  transition: transform 0.3s;
  animation: ${opening} 0.3s;

  @media (max-width: 768px) {
    padding: 8rem;
    width: 35rem;
  }
`;

export const MessageCircleIcon = styled(MessageCircle)`
  animation: ${iconAnimation} infinite 2s;
`;
