import { Link } from 'react-router-dom';
import {
  Button,
  MainSectionDiv,
  MainSection,
  SecondarySection,
  SecondarySectionDiv,
  InfoCard,
  GridCards,
  FlexDiv,
  DivText,
  DivButton,
  FlexDivCard,
} from './styled';
import { MoveRight, Wifi, Users, MessageSquareText } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  return (
    <div>
      <MainSection>
        <Navbar />
        <MainSectionDiv>
          <DivText>
            <h1>
              Converse com amigos, <br /> onde quer que esteja!
            </h1>
            <p>Simplicidade pra dar ênfase ao que realmente importa.</p>
          </DivText>

          <DivButton>
            <Link to={'/register'}>
              <Button>
                Começar
                <MoveRight />
              </Button>
            </Link>
          </DivButton>
        </MainSectionDiv>
      </MainSection>

      <SecondarySection>
        <SecondarySectionDiv>
          <h3>Simples, e em um só lugar.</h3>
          <GridCards>
            <InfoCard>
              <Wifi color="white" size={40} />
              <p className="subtitle">Conecte-se com quem importa.</p>

              <p className="text">
                Converse com amigos, familiares, aqueles que importam pra você,
                de qualquer lugar e a qualquer hora.
              </p>
            </InfoCard>
            <InfoCard>
              <Users color="white" size={40} />
              <p className="subtitle">Conversas e grupos animados!</p>

              <p className="text">
                Tenha conversas privadas com amigos ou crie grupos para
                conversar com várias pessoas ao mesmo tempo.
              </p>
            </InfoCard>
          </GridCards>

          <InfoCard style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <FlexDivCard>
              <MessageSquareText color="white" size={40} />
              <p className="subtitle">Mensagens rápidas e seguras.</p>

              <p className="text">
                Envie mensagens instantâneas e salve aquelas que são importantes
                para você.
              </p>
            </FlexDivCard>
          </InfoCard>

          <FlexDiv>
            <h3>O que está esperando? Comece agora!</h3>
            <Link to={'/register'}>
              <Button>
                Começar
                <MoveRight />
              </Button>
            </Link>
          </FlexDiv>
        </SecondarySectionDiv>
      </SecondarySection>
    </div>
  );
}

export default Home;
