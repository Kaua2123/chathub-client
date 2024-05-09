import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
