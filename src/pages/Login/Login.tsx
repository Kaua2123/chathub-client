import {
  Button,
  Container,
  Form,
  FormDiv,
  Input,
  Section,
  TextDiv,
} from './styled';
import chathub from '../../assets/chathub.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from '../../services/axios';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error('Preencha todos os campos para continuar.');
      }

      const response = await axios.post('/user/auth', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      toast.success('Você entrou na conta.');
      navigate('/conversations');
    } catch (error) {
      // if (typeof error !== unknown) toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <Section>
        <h3>
          Chathub
          <img
            src={chathub}
            alt=""
            style={{ borderRadius: '1.8rem', height: '5rem' }}
          />
        </h3>
        <Container>
          <TextDiv>
            <h4>Seja bem vindo de volta!</h4>

            <p>
              Não possui uma conta?
              <Link className="bold" to={'/register'}>
                <b> Cadastre-se </b>
              </Link>
            </p>
          </TextDiv>

          <FormDiv>
            <Form action="" method="post">
              <label htmlFor="Email">Email</label>
              <Input onChange={(e) => setEmail(e.target.value)} type="email" />
              <label htmlFor="Senha">Senha</label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Button type="submit" onClick={(e) => handleLogin(e)}>
                Entrar
              </Button>
            </Form>
          </FormDiv>
        </Container>
      </Section>
    </div>
  );
}

export default Login;
