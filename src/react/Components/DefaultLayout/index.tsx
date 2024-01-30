import React, { ReactNode, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Header from '../Header/index.tsx';
import { farm } from '../../Pages/Dashboard/index.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';
import Breadcrumbs from '../Breadcrumbs/index.tsx';
import createBreadcrumbs from '../../Utils/createBreadcrumbs/index.tsx';
import { MapSVG, PrintSVG } from '../../../images/svg.tsx';

type defaultLayoutProps = {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  toggleMap?: () => void;
};

function DefaultLayout({ children, toggleMap }: defaultLayoutProps) {
  const [farms, setFarms] = useState<farm[]>([]);
  const [turbines, setTurbines] = useState<turbine[]>([]);

  //   We do the below to avoid having to call the same apis accross multiple components
  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const isTurbinePage = JSON.stringify(pathArray).includes('turbine');

  const breadcrumbs = createBreadcrumbs(farms, turbines);

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

  const componentRef = useRef<HTMLInputElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef} className="w-full h-screen bg-neutral-100 text-neutral-700 flex flex-col">
      <Header farms={farms} />
      <div className="rounded-lg border border-neutral-200 bg-white mx-4 h-full px-4 py-2">
        <div className="flex gap-2">
          <Breadcrumbs crumbs={breadcrumbs} />
          <div className="flex p-2 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mb-3 mt-2">
            <button aria-label="print" type="button" onClick={() => toggleMap?.()}>
              <MapSVG />
            </button>
          </div>
          <div className="flex p-2 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mb-3 mt-2">
            <button aria-label="print" type="button" onClick={() => handlePrint()}>
              <PrintSVG />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
