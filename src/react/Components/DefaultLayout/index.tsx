import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Header/index.tsx';
import { farm } from '../../Pages/Dashboard/index.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';

function DefaultLayout({ children }: { children: React.Node }) {
  const [farms, setFarms] = useState<farm[]>([]);
  const [turbines, setTurbines] = useState<turbine[]>([]);

  //   We do the below to avoid having to call the same apis accross multiple components
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const isDashboardPage = JSON.stringify(pathArray[pathArray.length - 1]) === JSON.stringify('farms');
  const isFarmPage = pathArray.length === 3 && pathArray[1] === 'farm';
  const isTurbinePage = JSON.stringify(pathArray).includes('turbine');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/farms')
      .then((res) => setFarms(res.data))
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    if (!isTurbinePage) {
      return;
    }
    const farmID = pathArray[pathArray.length - 3];
    axios
      .get(`http://localhost:8080/api/farms/${farmID}/turbines`)
      .then((res) => setTurbines(res.data))
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const createTitle = () => {
    if (farms.length === 0) {
      return null;
    }

    if (isDashboardPage) {
      return 'Dashboard';
    }

    if (isTurbinePage) {
      const turbineId = Number(pathArray[pathArray.length - 1]);
      const currentTurbine = turbines.find((turbine) => turbine.id === turbineId);
      return currentTurbine ? currentTurbine.name : '';
    }

    const farmID = pathArray[pathArray.length - 1];
    const currentFarm = farms.filter((farm) => farm.id === Number(farmID))[0];
    if (isFarmPage && currentFarm) {
      return farms.filter((farm) => farm.id === Number(farmID))[0].name;
    }
    return '';
  };

  return (
    <div className="w-full h-screen bg-neutral-100 text-neutral-700 flex flex-col">
      <Header farms={farms} />
      <div className="rounded-lg border border-neutral-200 bg-white m-4 h-full px-4 py-2">
        <h1 className="text-3xl">{createTitle()}</h1>
        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
