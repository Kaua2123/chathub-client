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
          duration: 2300,
        }}
      />
    </ThemeProvider>
  );
}
// padding: 2rem;
// display: flex;
// align-items: center;
// font-size: 1.5rem;
// gap: 2rem;
// font-family: Raleway;
// background-color: ${({ theme }) => theme.colors.mediumBlue};
// color: ${({ theme }) => theme.colors.darkGray};
// border: ${({ theme }) => theme.colors.lighterBlue};

export default App;
