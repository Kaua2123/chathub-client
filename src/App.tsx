import { ThemeProvider } from 'styled-components';
import AppRouter from './router';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
