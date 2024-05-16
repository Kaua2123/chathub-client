import styled from 'styled-components';

export const Div = styled.div`
  p {
    font-family: Montserrat;
    font-size: 4rem;
  }
  max-width: 120rem;
  margin: 0 auto;
  color: white;
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
`;

export const DivButtons = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 3rem;
`;

export const DivUserAvatar = styled.div`
  border-radius: 30%;
  display: flex;
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
  border-radius: 30%;
`;

export const DivUserInfo = styled.div`
  width: 50%;
  p {
    font-size: 2.2rem;
    font-family: Raleway;
  }
  .info {
    color: ${({ theme }) => theme.colors.darkGray};
    font-size: 1.9rem;
  }
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
  font-size: 2rem;
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
