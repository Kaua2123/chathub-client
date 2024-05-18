import { ArrowLeft, EllipsisVertical, Trash } from 'lucide-react';
import styled from 'styled-components';

export const Container = styled.div`
  color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightBlue};
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  gap: 4rem;
  font-family: 'Raleway';
`;

export const UserAvatar = styled.div`
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
`;

export const EllipsisVerticalIcon = styled(EllipsisVertical)`
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10%);
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;
export const ArrowLeftIcon = styled(ArrowLeft)`
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateX(-10%);
    color: ${({ theme }) => theme.colors.lighterBlue};
  }
`;

export const DivUser = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 1.4rem;
`;
export const DivConfig = styled.div`
  display: flex;
  align-items: center;
`;

export const TrashIcon = styled(Trash)`
  transition: transform 0.3s;
  z-index: 2;
  cursor: pointer;

  &:hover {
    color: #c67c7c;

    transform: translateY(-10%);
  }
`;
