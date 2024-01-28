import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useLocation } from 'react-router-dom';
import BreezeLogo from '../../../images/breeze_logo.png';

function Dashboard() {
  const [farms, setFarms] = useState([]);
  const [error, setError] = useState('');

  const location = useLocation();
  const farmIdString = location.pathname.split('/').pop();
  const farmId = Number(farmIdString);

  const farm = farms[farmId - 1];

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/farms')
      .then((res) => setFarms(res.data.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const formatResult = (item) => <span className="cursor-pointer">{item.name}</span>;

  return (
    <div className="w-full h-screen bg-neutral-100 text-neutral-700 flex flex-col">
      {farm && (
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
            <h1 className="text-3xl">{farm.name}</h1>
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
