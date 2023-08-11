'use client';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../utils/fetchWrapper';
import { CardFilter } from './CardFilter';
const containerStyle = {
  width: '100%',
  height: '100vh',
  maxHeight: '100vh',
};

export const MapContainer = () => {
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new Error('API KEY NOT FOUND');
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          getEventsByLocation(latitude, longitude);
        },
        (error) => {
          console.log('erro ao buscar localização');
        },
      );
    }
  }, []);
  const getEventsByLocation = async (lat: number, lng: number) => {
    const response = await fetchWrapper(
      `/events?latitude=${lat}&longitude=${lng}`,
      {
        method: 'GET',
      },
    );

    setMarkers(response);
  };
  console.log(selectedMarker);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={{
            lat: Number(marker.location.latitude),
            lng: Number(marker.location.longitude),
          }}
          onClick={(e) => setSelectedMarker(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={{
            lat: Number(selectedMarker.location.latitude),
            lng: Number(selectedMarker.location.longitude),
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <CardFilter event={selectedMarker} />
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <>
      {' '}
      <p>carregando...</p>
    </>
  );
};
