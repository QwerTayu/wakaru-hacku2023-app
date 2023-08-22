import styles from './Content.module.css'
import PlaceInfo from '@/components/PlaceInfo';

import { GoogleMap, useLoadScript} from '@react-google-maps/api';
import { useCallback, useEffect, useRef, useState } from 'react';

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

// const center = {
//   lat: 35.69575,
//   lng: 139.77521,
// };

function  MapContent() {
  const [center, setCenter] = useState({lat: 35.69575, lng: 139.77521});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";


  return (
    <div className={styles.container}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle} 
        center={center} 
        zoom={16}
        options={options}
        onLoad={onMapLoad}
      >
        <PlaceInfo />
      </GoogleMap>
    </div>
  );
};

export default MapContent;