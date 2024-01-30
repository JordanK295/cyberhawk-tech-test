import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import mapStyle from './mapStyle.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';

function GoogleMap({ turbines }: { turbines: turbine[] }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  if (!apiKey) {
    console.error('API key is not defined. Please set REACT_APP_GOOGLE_MAP_API_KEY environment variable.');
  } else {
    return (
      <div
        data-testid="google-map"
        className="w-[600px] h-[400px] shrink-0 border border-gray-200 p-2 rounded-lg bg-gray-50 "
      >
        <APIProvider apiKey={apiKey}>
          <Map zoom={3} center={{ lat: 22.54992, lng: 0 }} gestureHandling="greedy" disableDefaultUI styles={mapStyle}>
            {turbines.map((turbine) => (
              <Marker key={turbine.id} title={turbine.name} position={{ lat: turbine.lat, lng: turbine.lng }} />
            ))}
          </Map>
        </APIProvider>
      </div>
    );
  }
}

export default GoogleMap;
