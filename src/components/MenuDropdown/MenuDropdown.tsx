import { LogOut, User } from 'lucide-react';
import { Button, Div, Menu } from './styled';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export type MenuDropdownProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuDropdown({ setIsMenuOpen }: MenuDropdownProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('chamada');
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Você saiu da conta. Nos vemos depois!');
  };

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
          <Button onClick={() => navigate('/profile')}>
            <User />
            <p>Perfil</p>
          </Button>
          <Button onClick={handleLogout}>
            <LogOut />
            <p>Sair</p>
          </Button>
        </Div>
      </Menu>
    </div>
  );
}

export default MenuDropdown;
