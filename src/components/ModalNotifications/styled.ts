import { X, Bell, Trash } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
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

export const Container = styled.div`
  position: relative;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  padding: 14rem;
  border-radius: 2rem;
  transition: transform 0.3s;
  animation: ${opening} 0.3s;

  @media (max-width: 768px) {
    padding: 8rem;
    width: 35rem;
  }
`;

export const Div = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const DivNotifications = styled.div`
  height: 24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 1.4rem;

  &::-webkit-scrollbar {
    width: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1.7rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 2.5rem;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.darkGray};
  padding: 0.4rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    & svg {
      stroke: black;
    }
  }
`;

export const CircleXIcon = styled(X)``;
export const BellIcon = styled(Bell)`
  color: ${({ theme }) => theme.colors.darkGray};
  margin-bottom: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  margin: 2.5rem;
`;
export const TrashIcon = styled(Trash)``;
