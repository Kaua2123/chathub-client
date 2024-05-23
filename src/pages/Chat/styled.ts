import {
  SendHorizontal,
  ArrowLeft,
  EllipsisVertical,
  Trash,
} from 'lucide-react';
import styled from 'styled-components';

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
`;

export const Div = styled.div`
  display: flex;
  padding-left: 1.5rem;
  gap: 2rem;
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

export const DivMessages = styled.div``;

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
