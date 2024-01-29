import React, { ReactNode, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import Header from '../Header/index.tsx';
import { farm } from '../../Pages/Dashboard/index.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';
import Breadcrumbs from '../Breadcrumbs/index.tsx';
import createBreadcrumbs from '../../Utils/createBreadcrumbs/index.tsx';

function DefaultLayout({ children }: { children: ReactNode }) {
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
        <div className="flex gap-4">
          <Breadcrumbs crumbs={breadcrumbs} />
          <div className="flex p-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mb-3 mt-2">
            <button aria-label="print" type="button" onClick={() => handlePrint()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-[#000000] hover:fill-[#649dad] cursor-pointer"
                fill="#000000"
                version="1.1"
                id="Capa_1"
                height="20px"
                width="20px"
                viewBox="0 0 45 45"
                xmlSpace="preserve"
              >
                <g>
                  <path d="M42.5,19.408H40V1.843c0-0.69-0.561-1.25-1.25-1.25H6.25C5.56,0.593,5,1.153,5,1.843v17.563H2.5   c-1.381,0-2.5,1.119-2.5,2.5v20c0,1.381,1.119,2.5,2.5,2.5h40c1.381,0,2.5-1.119,2.5-2.5v-20C45,20.525,43.881,19.408,42.5,19.408z    M32.531,38.094H12.468v-5h20.063V38.094z M37.5,19.408H35c-1.381,0-2.5,1.119-2.5,2.5v5h-20v-5c0-1.381-1.119-2.5-2.5-2.5H7.5   V3.093h30V19.408z M32.5,8.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25   S33.189,8.792,32.5,8.792z M32.5,13.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25   S33.189,13.792,32.5,13.792z M32.5,18.792h-20c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25h20c0.689,0,1.25,0.56,1.25,1.25   S33.189,18.792,32.5,18.792z" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export default DefaultLayout;
