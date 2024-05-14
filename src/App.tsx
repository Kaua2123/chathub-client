import { ThemeProvider } from 'styled-components';
import AppRouter from './router';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { DndContext } from '@dnd-kit/core';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndContext>
        <AppRouter />
      </DndContext>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
