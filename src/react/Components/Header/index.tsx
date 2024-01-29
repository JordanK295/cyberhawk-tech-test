import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useNavigate } from 'react-router-dom';
import BreezeLogo from '../../../images/breeze_logo.png';
import { farm } from '../../Pages/Dashboard/index.tsx';

function Header({ farms }: { farms: farm[] }) {
  const formatResult = (item: farm) => <span className="cursor-pointer">{item.name}</span>;
  const navigate = useNavigate();
  const handleOnSelect = (item: farm) => {
    navigate(`/farm/${item.id}`);
  };
  return (
    <header className="flex justify-between h-16 items-center px-4 my-3">
      <a href="/farms" className="flex items-center">
        <img src={BreezeLogo} alt="breeze logo" />
      </a>

      <div className="w-72">
        <ReactSearchAutocomplete
          items={farms}
          placeholder="Search Farms"
          onSelect={handleOnSelect}
          formatResult={formatResult}
        />
      </div>
    </header>
  );
}

export default Header;
