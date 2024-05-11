import { SendHorizontal } from 'lucide-react';
import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  font-family: 'Raleway';
  width: 100%;
`;

export const SendMessage = styled.div`
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

export const Div = styled.div`
  display: flex;
  padding-left: 1.5rem;
  gap: 2rem;
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
