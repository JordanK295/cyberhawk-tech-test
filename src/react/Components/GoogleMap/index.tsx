import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import mapStyle from './mapStyle.tsx';
import { turbine } from '../../Pages/Farm/index.tsx';

function GoogleMap({ turbines }: { turbines: turbine[] }) {
  return (
    <div data-testid="google-map" className="w-full h-50vh">
      <APIProvider apiKey="AIzaSyAmFCD4MJRHQUz7LLZJcp2iKplFBtbQaRs">
        <Map zoom={3} center={{ lat: 22.54992, lng: 0 }} gestureHandling="greedy" disableDefaultUI styles={mapStyle}>
          {turbines.map((turbine) => (
            <Marker key={turbine.id} title={turbine.name} position={{ lat: turbine.lat, lng: turbine.lng }} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
