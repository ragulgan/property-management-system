import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleApiKey } from '../utils/constants'

const MapContainer = () => {
  const mapStyles = {
    height: '200px',
    width: '100%',
    borderRadius: '8px'
  };

  const defaultCenter = {
    lat: 13.0404917,
    lng: 80.1931135,
  };

  return (
    <LoadScript googleMapsApiKey={googleApiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
      <Marker position={defaultCenter} title="Drag me" />
    </LoadScript>
  );
};

export default MapContainer;