import { CircleCheck, CircleX } from 'lucide-react';
import styled from 'styled-components';

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7rem;

  @media (max-width: 768px) {
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    gap: 3.5rem;
    border-radius: 1.7rem;
  }
`;

export const DivIsOnline = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const DivUser = styled.div`
  display: flex;
  gap: 2.5rem;
`;

export const UserImage = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;

  img {
    border-radius: 100%;
    width: 4.6rem;
    height: 4.6rem;
  }
`;

export const UserAvatar = styled.div`
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserData = styled.div`
  display: flex;
  flex-flow: column wrap;

  .is-online {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const DivOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const Button = styled.div`
  cursor: pointer;
`;

export const CircleCheckIcon = styled(CircleCheck)`
  &:hover {
    transition: transform 0.3s;

    transform: translateY(-10%);
    stroke: #93d371;
  }
`;
export const CircleXIcon = styled(CircleX)`
  &:hover {
    transition: transform 0.3s;

    transform: translateY(-10%);
    stroke: #c67c7c;
  }
`;
