import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DefaultLayout from '../../Components/DefaultLayout/index.tsx';

export type turbine = {
  id: number;
  name: string;
  numberOfComponents: number;
  mostRecentInspection: string;
  averageGrade: number;
  lat: number;
  lng: number;
};

const columnHelper = createColumnHelper<turbine>();

const columns = [
  columnHelper.accessor('id', {
    header: () => 'Turbine ID',
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
  }),
  columnHelper.accessor('lat', {
    header: () => 'Latitude',
    cell: (info) => <p>{parseFloat(info.getValue().toFixed(4))}</p>,
  }),
  columnHelper.accessor('lng', {
    header: 'Longitude',
    cell: (info) => <p>{parseFloat(info.getValue().toFixed(4))}</p>,
  }),
  columnHelper.accessor('mostRecentInspection', {
    header: 'Last Inspection',
  }),
  columnHelper.accessor('averageGrade', {
    header: 'Average Grade',
  }),
  columnHelper.accessor('numberOfComponents', {
    header: 'Number Of Components',
  }),
];

function Farm() {
  const [turbines, setTurbines] = useState<turbine[]>([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const farmID = pathArray[pathArray.length - 1];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/farms/${farmID}/turbines`)
      .then((res) => setTurbines(res.data))
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  }, []);

  const table = useReactTable({
    data: turbines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  return (
    <DefaultLayout>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => navigate(`/farm/${farmID}/turbine/${row.original.id}`)}
              className="bg-white border-b hover:bg-blue-50 duration-100 cursor-pointer"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-gray-900 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DefaultLayout>
  );
}

export default Farm;
