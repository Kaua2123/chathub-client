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
`;

export const DivFriends = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  height: 55vh;
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
`;

export const DivFriendsRequests = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBlue};
  height: 55vh;
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
`;
