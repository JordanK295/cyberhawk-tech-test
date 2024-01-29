import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/index.tsx';

function App() {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to="/farm/1" />;
  }

  return (
    <Routes>
      <Route path="/farms" element={<Dashboard />} />
      <Route path="/farm/:farmid" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
