import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/index.tsx';
import Farm from '../Pages/Farm/index.tsx';
import Turbine from '../Pages/Turbine/index.tsx';

function App() {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navigate to="/farms" />;
  }

  return (
    <Routes>
      <Route path="/farms" element={<Dashboard />} />
      <Route path="/farm/:farmid" element={<Farm />} />
      <Route path="/farm/:farmid/turbine/:turbineid" element={<Turbine />} />
    </Routes>
  );
}

export default App;
