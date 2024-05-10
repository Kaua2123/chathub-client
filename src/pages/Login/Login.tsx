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
import { Link } from 'react-router-dom';

function Login() {
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
              <Button type="submit">Criar conta</Button>
            </Form>
          </FormDiv>
        </Container>
      </Section>
    </div>
  );
}

export default Login;
