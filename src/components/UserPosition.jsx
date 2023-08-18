import { auth, col } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const UserPosition = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [userStatus, setUserStatus] = useState(false);
  const [userArchivePlace, setUserArchivePlace] = useState({Lat: 0, Lng: 0});

  const docRef = doc(col, auth.currentUser.uid);

  onSnapshot(docRef, (doc) => {
    setUserStatus(doc.data().isInOffice);
    setUserArchivePlace({latitude: doc.data().archiveLat, longitude: doc.data().archiveLng});
    });

  useEffect(() => {
    // ユーザーの位置情報をリアルタイムで監視
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(userLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );

      // コンポーネントがアンマウントされたら監視を停止
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  if(userStatus) {
    return location;
  } else {
    return userArchivePlace;
  }
};
export default UserPosition;
