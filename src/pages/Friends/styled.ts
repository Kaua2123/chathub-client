import { Search } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  color: white;
  min-height: 80vh;

  .title {
    font-size: 4rem;
    font-family: 'Montserrat';
  }

  .result {
    font-family: Raleway;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 2rem;
    @media (max-width: 768px) {
      margin: 2rem;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 3rem;
      margin: 2rem;
    }
  }
`;

export const DivFriends = styled.div<{ $hasFriends?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  height: ${(props) => (props.$hasFriends ? '55vh' : 'auto')};
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 3.4rem;
  padding: 4rem;
  border-radius: 1.7rem;

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

export const DivFriendsRequests = styled.div<{ $hasFriendsRequests?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  height: ${(props) => (props.$hasFriendsRequests ? '55vh' : 'auto')};
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 3.4rem;
  padding: 4rem;
  border-radius: 1.7rem;

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

export const DivSearchUsers = styled.div`
  position: relative;

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.mediumBlue};
    color: ${({ theme }) => theme.colors.darkGray};
    font-family: 'Raleway';
    font-size: 1.8rem;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.darkBlue};
    transition: transform 0.3s;
    border-radius: 0.9rem;
    padding-left: 20rem;
    padding: 2rem;
    margin-top: 5rem;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.lighterBlue};
    }
  }

  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

export const SearchIcon = styled(Search)``;

export const Button = styled.button`
  position: absolute;
  border-radius: 1.7rem;
  padding: 1rem;
  cursor: pointer;
  border: none;
  margin-right: 2rem;
  right: 0;
  top: 0;
  margin-top: 6rem;
  opacity: 0.9;

  &:hover {
    opacity: 1;

    & svg {
      // stroke para alterar a cor das linhas do ícone
      stroke: ${({ theme }) => theme.colors.lighterBlue};
    }
  }
`;
export const Input = styled.input``;

export const DivResult = styled.div<{ $hasUsers?: boolean }>`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  height: ${(props) => (props.$hasUsers ? '55vh' : 'auto')};
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 3.4rem;
  margin-bottom: 13rem;
  padding: 4rem;
  border-radius: 1.7rem;

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
