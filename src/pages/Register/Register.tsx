import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
import axios from '../../services/axios';
import { toast } from 'sonner';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    try {
      if (!fullName || !username || !email || !password) {
        return toast.error('Preencha todos os campos para continuar.');
      }

      await axios.post('/user/create', {
        name: fullName,
        username,
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
            <h4>Criar conta no Chathub</h4>

            <p>
              Já é cadastrado?{' '}
              <Link className="bold" to={'/login'}>
                <b> Entrar </b>
              </Link>
            </p>
          </TextDiv>

          <FormDiv>
            <Form action="">
              <label htmlFor="Nome completo">Nome Completo</label>
              <Input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />

              <label htmlFor="Como quer ser chamado">Apelido</label>
              <Input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />

              <label htmlFor="Email">Email</label>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="Senha">Senha</label>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={(e) => handleRegister(e)}>Criar conta</Button>
            </Form>
          </FormDiv>
        </Container>
      </Section>
    </div>
  );
}

export default Register;
