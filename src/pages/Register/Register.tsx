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

function Register() {
  return (
    <div>
      <Section>
        <h3>
          Chathub
          <img
            src={chathub}
            alt=""
            style={{ borderRadius: '1rem', height: '5rem' }}
          />
        </h3>
        <Container>
          <TextDiv>
            <h4>Criar a sua conta no chathub</h4>
            <p>Forneça seus dados. Prepararemos tudo pra você.</p>

            <p>
              Já é cadastrado?{' '}
              <Link className="bold" to={'#'}>
                <b> Entrar </b>
              </Link>
            </p>
          </TextDiv>

          <FormDiv>
            <Form action="" method="post">
              <label htmlFor="Nome completo">Nome Completo</label>
              <Input type="text" />
              <label htmlFor="Como quer ser chamado">Apelido</label>
              <Input type="text" />
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

export default Register;
