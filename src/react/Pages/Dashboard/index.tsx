import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import BreezeLogo from '../../../images/breeze_logo.png';

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
    header: () => 'Name',
  }),
  columnHelper.accessor('numberOfTurbines', {
    header: () => <span>Number of Turbines</span>,
  }),
  columnHelper.accessor('oldestInspection', {
    header: 'Oldest inspection',
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
      });
  }, []);

  const navigate = useNavigate();

  const table = useReactTable({
    data: farms,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const formatResult = (item: farm) => <span className="cursor-pointer">{item.name}</span>;

  return (
    <div className="w-full h-screen bg-neutral-100 text-neutral-700 flex flex-col">
      {farms && (
        <>
          <header className="flex justify-between h-16 items-center px-4 py-2">
            <img src={BreezeLogo} alt="breeze logo" />
            <div className="w-72">
              <ReactSearchAutocomplete
                items={farms}
                // onSearch={handleOnSearch}
                // onHover={handleOnHover}
                // onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                // autoFocus
                formatResult={formatResult}
              />
            </div>
          </header>
          <div className="rounded-lg border border-neutral-200 bg-white m-4 h-full px-4 py-2">
            <h1 className="text-3xl">Farms</h1>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
