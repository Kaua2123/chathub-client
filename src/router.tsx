import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Conversations from './pages/Conversations/Conversations';
import Conversation from './pages/Conversation/Conversation';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Login />} path="/login" />
        <Route element={<Conversations />} path="/conversations" />
        <Route element={<Conversation />} path="/conversation/:id" />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
