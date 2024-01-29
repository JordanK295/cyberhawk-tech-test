import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DefaultLayout from '../../Components/DefaultLayout/index.tsx';

type component = {
  id: number;
  componentTypeId: number;
  turbineId: number;
  lastInspection: string;
  grade: number;
};

const columnHelper = createColumnHelper<component>();

const columns = [
  columnHelper.accessor('id', {
    header: () => 'Component ID',
  }),
  columnHelper.accessor('componentTypeId', {
    header: () => 'Component Type ID',
  }),
  columnHelper.accessor('lastInspection', {
    header: () => 'Last Inspection',
  }),
  columnHelper.accessor('grade', {
    header: 'Grade',
  }),
];

function Turbine() {
  const [components, setComponents] = useState<component[]>([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const pathArray = location.pathname.split('/');
  const turbineId = pathArray[pathArray.length - 1];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/turbines/${turbineId}/components`)
      .then((res) => setComponents(res.data.components))
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  }, []);

  const table = useReactTable({
    data: components,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
            <tr key={row.id} className="bg-white border-b hover:bg-blue-50 duration-100">
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

export default Turbine;
