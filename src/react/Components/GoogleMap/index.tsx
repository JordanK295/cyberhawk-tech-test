import React from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import mapStyle from './mapStyle.tsx';

function GoogleMap() {
  return (
    <div className="w-full h-50vh">
      <APIProvider apiKey="AIzaSyAmFCD4MJRHQUz7LLZJcp2iKplFBtbQaRs">
        <Map zoom={3} center={{ lat: 22.54992, lng: 0 }} gestureHandling="greedy" disableDefaultUI styles={mapStyle}>
          <Marker position={{ lat: 28, lng: -12 }} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default GoogleMap;
