import styled from 'styled-components';

export const Img = styled.image`
  width: 2rem;
  height: 2rem;
`;

export const Container = styled.div`
  padding: 4rem;
  border-radius: 1.2rem;

  @media (max-width: 768px) {
  }
`;

export const Section = styled.section`
  margin: 0 auto;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-top: 2rem;

  h3 {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 3rem;
    }
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
    color: ${({ theme }) => theme.colors.lighterBlue};

    &:hover {
      color: ${({ theme }) => theme.colors.darkBlue};
    }
  }

  @media (max-width: 768px) {
    h4 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    align-items: start;
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

  background-color: ${({ theme }) => theme.colors.lighterBlue};
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
  transition: transform 0.3s;
  outline: none;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: 'Raleway';
  font-size: 1.8rem;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.lighterBlue};
  }
`;
