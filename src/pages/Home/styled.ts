import styled from 'styled-components';
import background from '../../assets/cellphone.jpg';

export const MainSectionDiv = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  height: 80%;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 2rem;
  }

  p {
    font-size: 2.5rem;
    z-index: 2;
    position: relative;
    color: ${({ theme }) => theme.colors.white};
    font-family: 'Montserrat';
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    p {
      font-size: 1.9rem;
      width: 90%;
    }
  }
`;

export const DivText = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;
export const DivButton = styled.div``;

export const MainSection = styled.section`
  height: 100vh;
  position: relative;

  h1 {
    font-weight: 600;
    position: relative;
    z-index: 2;
  }

  &::after {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: -25px;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0.5;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
  }
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.lighterBlue};
  border-radius: 1.7rem;
  color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2rem;
  z-index: 2;
  width: 18rem;
  font-size: 1.7rem;

  position: relative;
  border: none;
  font-family: 'Raleway';
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

export const SecondarySection = styled.div`
  height: 120vh;
`;

export const SecondarySectionDiv = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 6rem;

  h3 {
    font-weight: 600;
    margin-bottom: 4rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 3rem;
    }
  }
`;

export const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  border-radius: 1.2rem;
  padding: 4rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1) translateY(-2%);
  }

  p {
    font-family: 'Montserrat';
    color: white;
  }

  .subtitle {
    font-size: 2rem;
    margin-top: 1rem;
  }

  .text {
    color: ${({ theme }) => theme.colors.darkGray};
    margin-top: 3rem;
  }
`;

export const GridCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FlexDivCard = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    align-items: start;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: center;
    h3 {
      font-size: 3rem;
    }
  }
`;
