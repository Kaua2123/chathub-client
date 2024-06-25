import { Button, Div, Menu } from './styled';

export type ChatDropdownProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChatDropdown({ setIsMenuOpen, setIsDeleting }: ChatDropdownProps) {
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((e.target as HTMLDivElement).id === 'menu') {
      setIsMenuOpen(false);
    }
  };

  return (
    <div>
      <Menu id="menu" onClick={handleOutsideClick}>
        <Div>
          <Button>
            <p>Adicionar usuários</p>
          </Button>
          <Button
            onClick={() => {
              setIsMenuOpen(false);
              setIsDeleting(true);
            }}
          >
            <p>Excluir conversa</p>
          </Button>
        </Div>
      </Menu>
    </div>
  );
}

export default ChatDropdown;
