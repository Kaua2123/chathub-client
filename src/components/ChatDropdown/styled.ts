import styled, { keyframes } from 'styled-components';

const openingMenu = keyframes`
  0% {
    opacity: 0.2;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Menu = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  .participants-btn {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    p {
      margin: 0.2rem;
    }
  }
`;

export const Div = styled.div`
  background-color: green;
  animation: ${openingMenu} 0.3s;
  position: absolute;
  right: 1%;
  margin-top: 8rem;
  margin-right: 2.3rem;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  border-radius: 1.7rem;
  padding: 1.5rem;
`;

export const Button = styled.button`
  width: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  border-radius: 1rem;
  font-family: Raleway;
  font-size: 1.3rem;
  transition: transform 0.3s;
  cursor: pointer;
  background-color: white;
  border: none;
  transition: 0.1s;

  &:hover {
    opacity: 0.9;
  }
`;
