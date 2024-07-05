import {
  SendHorizontal,
  ArrowLeft,
  EllipsisVertical,
  Trash,
} from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const typingFade = keyframes`
  0%, 100% {
    opacity: 1;
  }
  25% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.6;
  }

  75% {
    opacity: 0.8;
  }
`;

export const Container = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  font-family: 'Raleway';
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkBlue};

  .is-typing {
    z-index: 0;
    position: absolute;
    left: 40px;
    top: -0px;
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 14px;
    animation: ${typingFade} 3s infinite;
  }
`;

export const Div = styled.div`
  display: flex;
  padding-left: 1.5rem;
  gap: 2rem;
`;

export const DivIsOnline = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Button = styled.button`
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

  border: none;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: 'Raleway';
  font-size: 1.8rem;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.darkBlue};
  transition: transform 0.3s;
  border-radius: 0.9rem;
  padding-left: 4rem;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.lighterBlue};
  }
`;

export const SendHorizontalIcon = styled(SendHorizontal)``;

export const DivMessages = styled.div`
  gap: 3rem;
  margin-top: 3.4rem;
  height: 73vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

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

export const TopContainer = styled.div`
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 4rem;
  font-family: 'Raleway';
`;

export const UserAvatar = styled.div`
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
`;

export const DivData = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  input {
    border-radius: 0.8rem;
    padding: 1rem;
    transition: transform 0.3s;
    outline: none;
    border: 1px solid gray;
    font-size: 1.5rem;
    font-family: Raleway;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.lighterBlue};
    }
  }

  button {
    border: none;
    background-color: inherit;
    cursor: pointer;

    &:hover {
      & svg {
        stroke: ${({ theme }) => theme.colors.lighterBlue};
      }
    }
  }
`;

export const EllipsisVerticalIcon = styled(EllipsisVertical)`
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10%);
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;
export const ArrowLeftIcon = styled(ArrowLeft)`
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateX(-10%);
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;

export const DivUser = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1.4rem;
`;
export const DivConfig = styled.div`
  display: flex;
  align-items: center;
`;

export const TrashIcon = styled(Trash)`
  transition: transform 0.3s;
  z-index: 2;
  cursor: pointer;

  &:hover {
    color: #c67c7c;

    transform: translateY(-10%);
  }
`;
