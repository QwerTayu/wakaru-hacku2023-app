import GoogleMapReact from 'google-map-react';
import styles from './Content.module.css'
import db from '@/firebase'
import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from "firebase/firestore"

export default function MapContent() {
  const [users, setUsers] = useState([]);
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const items = [
    defaultLatLng,
    {
      lat: 36.7022589,
      lng: 135.7744733,
    },
    {
      lat: 37.7022589,
      lng: 130.7744733,
    },
    {
      lat: 32.7022589,
      lng: 142.7744733,
    },
  ];

  // useEffect(() => {
  //   // データを取得する処理
  //   const fetchData = async () =>{
  //     const userData = collection(db, "user");


  //     try {
  //     const snapshot = await getDocs(userData);
  //     const userDocs = snapshot.docs.map((doc) => ({ ...doc.data() }));
  //     setUsers(userDocs);

  //     onSnapshot(userData, (snapshot) => {
  //       const updatedUserDocs = snapshot.docs.map((doc) => ({ ...doc.data() }));
  //       setUsers(updatedUserDocs);
  //     });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleApiLoaded = ({ map, maps }) => {
    const bounds = new maps.LatLngBounds();
    items.forEach((item) => {
      const marker = new maps.Marker({
        position: {
          lat: item.lat,
          lng: item.lng,
        },
        map,
      });
      bounds.extend(marker.position);
    });
    map.fitBounds(bounds);
  };

  return (
    <div className={styles.container}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY }}
        defaultZoom={16}
        defaultCenter={defaultLatLng}
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  );
};