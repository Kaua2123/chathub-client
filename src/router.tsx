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

import ChatProvider from './contexts/ChatProvider';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Conversations />} path="/conversations" />
        <Route
          element={
            <ChatProvider>
              <Chat />
            </ChatProvider>
          }
          path="/chat/:id/:username"
        />
        <Route element={<Friends />} path="/friends" />
        <Route element={<BlockedUsers />} path="/blockedUsers" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
