import styled from 'styled-components';

export const Div = styled.div`
  color: white;
  max-width: 120rem;
  margin: 0 auto;

  p {
    font-size: 4rem;
    font-family: 'Montserrat';
  }
`;

export const DivConversations = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 3.4rem;
  height: 55vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mediumBlue};
    border-radius: 1.7rem;
  }
`;
