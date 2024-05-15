import styled from 'styled-components';

export const Div = styled.div`
  background-color: white;
  font-family: 'Raleway';
  padding: 2rem;
  border-radius: 1.7rem;
  width: 38rem;
  margin-bottom: 2rem;
  display: flex;
  flex-flow: row wrap;
`;

export const DeleteButton = styled.button`
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.darkGray};
  padding: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.2);
    & svg {
      stroke: red;
    }
  }
`;
