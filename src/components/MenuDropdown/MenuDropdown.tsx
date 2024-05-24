import { LogOut, User } from 'lucide-react';
import { Button, Div } from './styled';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function MenuDropdown() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('chamada');
    localStorage.removeItem('token');
    navigate('/');
    toast.success('Você saiu da conta. Nos vemos depois!');
  };

  return (
    <div>
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
    </div>
  );
}

export default MenuDropdown;
