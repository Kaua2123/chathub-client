import { useNavigate } from 'react-router-dom';
import { Button } from '../Home/styled';
import { Div } from './styled';
import chathub from '../../assets/chathub.png';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
          <img
            src={chathub}
            alt=""
            style={{ borderRadius: '1.8rem', height: '5rem' }}
          />
          <h2>Ops!</h2>
        </div>

        <p>
          Parece que a página que você está tentando acessar não existe. Que tal
          voltarmos?
        </p>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Voltar para HomePage
        </Button>
      </Div>
    </div>
  );
}

export default NotFound;
