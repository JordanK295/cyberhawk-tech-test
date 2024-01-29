import { useLocation } from 'react-router-dom';
import { farm } from '../../Pages/Dashboard/index.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';

const createBreadcrumbs = (farms: farm[], turbines: turbine[]) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

  const breadcrumbs = [];

  if (pathSegments.length === 1 && pathSegments[0] === 'farms') {
    breadcrumbs.push({ type: 'farms', title: 'Farms' });
  } else if (pathSegments.length === 2 && pathSegments[0] === 'farm') {
    const farmId = parseInt(pathSegments[1], 10);
    const farm = farms.find((f) => f.id === farmId);
    if (!farm) {
      return [];
    }

    breadcrumbs.push({ type: 'farms', title: 'Farms' });
    breadcrumbs.push({ type: 'farm', farmId, title: farm.name });
  } else if (pathSegments.length === 4 && pathSegments[0] === 'farm' && pathSegments[2] === 'turbine') {
    const farmId = parseInt(pathSegments[1], 10);
    const turbineId = parseInt(pathSegments[3], 10);
    const farm = farms.find((f) => f.id === farmId);
    const turbine = turbines.find((t) => t.id === turbineId);
    if (!farm || !turbine) {
      return [];
    }

    breadcrumbs.push({ type: 'farms', title: 'Farms' });
    breadcrumbs.push({ type: 'farm', farmId, title: farm ? farm.name : 'Unknown Farm' });
    breadcrumbs.push({ type: 'turbine', farmId, turbineId, title: turbine.name });
  }

  return breadcrumbs;
};

export default createBreadcrumbs;
