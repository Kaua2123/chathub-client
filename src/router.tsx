import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Conversations from './pages/Conversations/Conversations';
import Chat from './pages/Chat/Chat';
import Friends from './pages/Friends/Friends';
import BlockedUsers from './pages/BlockedUsers/BlockedUsers';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

import AuthProvider from './contexts/AuthProvider.tsx';
import ChatProvider from './contexts/ChatProvider';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route
          element={
            <AuthProvider>
              <Conversations />
            </AuthProvider>
          }
          path="/conversations"
        />
        <Route
          element={
            <ChatProvider>
              <Chat />
            </ChatProvider>
          }
          path="/chat/:id/:username"
        />
        <Route
          element={
            <AuthProvider>
              <Friends />
            </AuthProvider>
          }
          path="/friends"
        />
        <Route
          element={
            <AuthProvider>
              <BlockedUsers />
            </AuthProvider>
          }
          path="/blockedUsers"
        />
        <Route
          element={
            <AuthProvider>
              <Profile />
            </AuthProvider>
          }
          path="/profile"
        />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
