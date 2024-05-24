import { ThemeProvider } from 'styled-components';
import AppRouter from './router';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
      <GlobalStyle />
      <Toaster
        toastOptions={{
          style: {
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.5rem',
            gap: '2rem',
            fontFamily: 'Raleway',
            backgroundColor: '#374050',
            color: '#CCCCCC',
            border: 'none',
          },
          duration: 2700,
        }}
      />
    </ThemeProvider>
  );
}

export default App;
