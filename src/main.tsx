import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AuthProvider from './contexts/AuthProvider.tsx';
import SocketProvider from './contexts/SocketProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>,
);
