import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
// import getFarms from '../../Services/getFarms';

function Dashboard() {
  const [farms, setFarms] = useState([]);
  const [error, setError] = useState('');
  // const [singleSelections, setSingleSelections] = useState([]);

  // const listbox = {
  //   data: ['Peach', 'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Prune'],
  // };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/farms')
      .then((res) => setFarms(res.data.data))
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // console.log('FFf', farms, singleSelections);

  const formatResult = (item) => (
    <>
      {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
      <span className="cursor-pointer">{item.name}</span>
    </>
  );

  return (
    <div className="w-full h-screen text-neutral-700">
      <header className="flex justify-between bg-neutral-100 h-16 items-center px-4 py-2">
        <p>LOGO</p>
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
      <div className="rounded m-4">
        <h1>Farms</h1>
        <h2>Recently Viewed</h2>
        {error && <p className="text-danger">{error}</p>}
        {farms && farms.length > 0 && (
          <ul className="flex justify-evenly">
            {farms.slice(0, 4).map((user) => (
              <div>
                <li className="px-4 py-2 rounded-lg bg-neutral-100" key={user.id}>
                  {user.name}
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
