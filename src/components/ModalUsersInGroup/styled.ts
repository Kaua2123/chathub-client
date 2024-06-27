import { Image, X } from 'lucide-react';
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
  padding: 7rem;
  width: 60vw;
  border-radius: 2rem;
  transition: transform 0.3s;
  animation: ${opening} 0.3s;

  @media (max-width: 768px) {
    padding: 8rem;
    width: 35rem;
    height: 70vh;
  }
`;

export const DivUsers = styled.div<{ $hasFriends?: boolean }>`
  color: white;
  background-color: ${({ theme }) => theme.colors.black};
  height: ${(props) => (props.$hasFriends ? '55vh' : 'auto')};
  overflow-y: auto;
  padding: 6rem;
  overflow-x: hidden;
  margin-top: 3.4rem;
  border-radius: 1.7rem;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 20px rgba(0, 0, 0, 0.1);

  p {
    font-family: Raleway;
  }

  &::-webkit-scrollbar {
    width: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-radius: 1.7rem;
  }

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

export const DivButton = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 2rem;
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

export const Div = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 4rem;

  .create-group-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 4rem;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  border-radius: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  z-index: 2;
  position: relative;
  border: none;
  font-family: 'Raleway';
  font-size: 1.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

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
  position: relative;
`;

export const AbsoluteDiv = styled.div`
  .btn-absolute {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 5rem;
    padding: 0.8rem;

    @media (max-width: 768px) {
      margin-right: 3rem;
    }
  }
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

export const CircleXIcon = styled(X)``;
export const ImageIcon = styled(Image)`
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 1.8rem;
`;
