import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useLocation, useNavigate } from 'react-router-dom';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import BreezeLogo from '../../../images/breeze_logo.png';
import { farm } from '../Dashboard/index.tsx';

type turbine = {
  id: number;
  name: string;
  numberOfComponents: number;
  oldestInspection: string;
  averageGrade: number;
  lat: number;
  lng: number;
};

const columnHelper = createColumnHelper<turbine>();

const columns = [
  columnHelper.accessor('id', {
    header: () => 'Turbine ID',
    // cell: (info) => info.getValue(),
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
    // cell: (info) => <p>{info.getValue()}</p>,
  }),
  columnHelper.accessor('oldestInspection', {
    header: 'Oldest Inspection',
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

  // The ID is the last segment of the path
  const farmID = pathArray[pathArray.length - 1];

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/farms/${farmID}/turbines`)
      .then((res) => setTurbines(res.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const table = useReactTable({
    data: turbines,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const navigate = useNavigate();

  //   const table = useReactTable({
  //     data: farms,
  //     columns,
  //     getCoreRowModel: getCoreRowModel(),
  //   });

  //   const formatResult = (item: farm) => <span className="cursor-pointer">{item.name}</span>;

  console.log('ff', turbines);

  return (
    <div className="w-full h-screen bg-neutral-100 text-neutral-700 flex flex-col">
      <p>test</p>
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
  );
}

export default Farm;
