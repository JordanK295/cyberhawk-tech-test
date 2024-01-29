import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import DefaultLayout from '../../Components/DefaultLayout/index.tsx';

export type farm = {
  id: number;
  name: string;
  numberOfTurbines: number;
  oldestInspection: string;
  averageGrade: number;
};

const columnHelper = createColumnHelper<farm>();

const columns = [
  columnHelper.accessor('id', {
    // cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
  }),
  columnHelper.accessor('numberOfTurbines', {
    header: () => <span>Number of Turbines</span>,
  }),
  columnHelper.accessor('oldestInspection', {
    header: () => (
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-1 bg-gray-100 -mt-8">
          Last inspection requires all turbines on a farm to have been inspected
        </span>
        Last inspection
      </div>
    ),
  }),
  columnHelper.accessor('averageGrade', {
    header: 'Average Grade',
  }),
];

function Dashboard() {
  const [farms, setFarms] = useState<farm[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/farms')
      .then((res) => setFarms(res.data))
      .catch((err) => {
        setError(err.message);
        console.error(err.message);
      });
  }, []);

  const navigate = useNavigate();

  const table = useReactTable({
    data: farms,
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
      {farms && (
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
                onClick={() => navigate(`/farm/${row.original.id}`)}
                className="bg-white border-b hover:scale-[1.03] hover:border-y-2 hover:bg-blue-50 duration-100 cursor-pointer"
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
      )}
    </DefaultLayout>
  );
}

export default Dashboard;
