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

      await axios.post('/user/create', {
        email,
        password,
      });

      const response = await axios.post('/user/auth', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);

      toast.success('Você foi cadastrado.');
      navigate('/conversations');
    } catch (error) {
      toast.error('Ocorreu um erro na hora do cadastro.');
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
              <Input type="email" />
              <label htmlFor="Senha">Senha</label>
              <Input type="password" />
              <Button type="submit">Entrar</Button>
            </Form>
          </FormDiv>
        </Container>
      </Section>
    </div>
  );
}

export default Login;
