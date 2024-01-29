import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/index.tsx';
import Farm from '../Pages/Farm/index.tsx';

function App() {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to="/farms" />;
  }

  return (
    <Routes>
      <Route path="/farms" element={<Dashboard />} />
      <Route path="/farm/:farmid" element={<Farm />} />
    </Routes>
  );
}

export default App;
