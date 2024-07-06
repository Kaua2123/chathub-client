import styled, { keyframes } from 'styled-components';

export const Div = styled.div`
  p {
    font-family: Montserrat;
    font-size: 4rem;
  }
  max-width: 120rem;
  margin: 0 auto;
  color: white;
  @media (max-width: 768px) {
    margin: 2rem;
    p {
      font-size: 3rem;
    }
  }
`;

export const DivProfile = styled.div`
  border-radius: 1.7rem;
  padding: 6rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  margin-top: 2rem;
  width: 100%;
  min-height: 60vh;

  .image-avatar {
    width: 30rem;
    height: 30rem;
    border-radius: 100%;
  }

  @media (max-width: 768px) {
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    padding: 0;
    min-height: 112vh;
  }
`;

export const DivButtons = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;

  .cancel-btn {
    background-color: white;
    color: black;
  }

  @media (max-width: 800px) {
    display: flex;
  }
`;

export const DivUserAvatar = styled.div`
  border-radius: 30%;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 50%;
  justify-content: center;
`;

export const DivUserData = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1rem;
`;

export const UserAvatar = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 8rem;
  border-radius: 100%;

  position: relative;

  .img-button {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2rem;
    padding: 0.8rem;
    width: 4rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    .img-button {
      margin: 0;
      width: 0.5rem;
      height: 0.5rem;
      padding: 2rem;
    }
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

export const DivUserInfo = styled.div<{ $isUpdating?: boolean }>`
  width: 50%;
  p {
    font-size: 2.2rem;
    font-family: Raleway;
  }
  .info {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 1.9rem;
  }

  animation: ${(props) => (props.$isUpdating ? fadeIn : '')} 0.4s;
`;

export const Form = styled.form`
  label {
    display: inherit;
    margin-bottom: 1rem;
    font-family: Raleway;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  border-radius: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  border: none;
  font-family: 'Raleway';
  width: 16rem;
  font-size: 1.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  cursor: pointer;
  transition: transform 0.2s; // apliacndo o transform

  & svg {
    transition: transform 0.2s;
  }

  &:hover {
    transform: scale(1.05); // aumenta o elemento apenas visualmente
    color: ${({ theme }) => theme.colors.lightGray};

    & svg {
      transform: scale(1.2);
      color: ${({ theme }) => theme.colors.lightGray};
    }
  }
`;

export const Input = styled.input`
  padding: 1.2rem;
  width: 100%;
  margin-bottom: 1.3rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: 'Raleway';
  font-size: 1.8rem;
  border: 2px solid gray;
  border-radius: 0.9rem;
  font-family: 'Raleway';
  transition: transform 0.3s;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.lighterBlue};
  }
`;
