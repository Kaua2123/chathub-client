import { Image, Pencil, X } from 'lucide-react';
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

export const Container = styled.div`
  position: relative;
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

export const Div = styled.div<{ $isUpdating?: boolean }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  gap: 2rem;

  .msg-section {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    gap: 3rem;

    .message {
      box-shadow: 2px 2px 20px 4px rgba(0, 0, 0, 0.4);
      background-color: ${({ theme }) => theme.colors.white};
      padding: 2rem;
      border-radius: 0.9rem;
      width: 28rem;
      min-width: 28rem;
      transition: transform 0.3s;
      font-family: Raleway;
      font-size: 1.8rem;
      border: none;
    }
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  z-index: 2;
  position: relative;
  border: none;
  font-family: 'Raleway';
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  cursor: pointer;
  transition: transform 0.2s;
  color: black;
  width: 18rem;

  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: 'Raleway';
  font-size: 1.8rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.black};
  transition: transform 0.3s;
  border-radius: 0.9rem;
  padding-left: 4rem;
  padding: 1.6rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.lighterBlue};
  }
`;

export const GroupImage = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export const GroupData = styled.div`
  label {
    color: ${({ theme }) => theme.colors.white};
    font-family: Raleway;
    font-size: 1.7rem;
  }

  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
`;

export const H6 = styled.h6`
  margin-bottom: 5rem;
  display: flex;
  align-items: center;
  gap: 4rem;
`;

export const CircleXIcon = styled(X)``;
export const ImageIcon = styled(Image)``;

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

export const WavingPencilIcon = styled(Pencil)`
  animation: ${waving} 1s infinite;
`;
