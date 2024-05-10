import styled from 'styled-components';

export const Img = styled.image`
  width: 2rem;
  height: 2rem;
`;

export const Container = styled.div`
  padding: 4rem;
  border-radius: 1.2rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
`;

export const Section = styled.section`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-top: 2rem;

  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    gap: 4rem;
  }
`;

export const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: 'Raleway';

  .bold {
    text-decoration: none;
    transition: transform 0.3s;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.lightBlue};

    &:hover {
      color: ${({ theme }) => theme.colors.darkBlue};
    }
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  color: white;
  width: 100%;

  font-family: 'Raleway';

  label {
    display: block;
  }
`;

export const Form = styled.form`
  label {
    margin-bottom: 0.5rem;
  }
`;

export const Button = styled.button`
  width: 100%;
  margin-top: 2rem;

  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  border: none;
  font-family: 'Raleway';
  font-size: 1.7rem;
  cursor: pointer;
  transition: transform 0.2s; // apliacndo o transform

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
  border: 2px solid gray;
  border-radius: 0.9rem;
  font-size: 1.4rem;
  font-family: 'Raleway';
  transition: transform 0.3s;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.darkBlue};
  }
`;
