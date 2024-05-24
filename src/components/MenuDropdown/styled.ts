import styled from 'styled-components';

export const Div = styled.div`
  position: absolute;
  right: 1%;
  margin-top: 1rem;
  display: flex;
  flex-flow: column wrap;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.mediumBlue};
  border-radius: 1.7rem;
  padding: 1.5rem;
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.lighterBlue};
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

  &:hover {
    transform: translateX(-5%);

    & svg {
      stroke: ${({ theme }) => theme.colors.lighterBlue};
    }
  }
`;
