import { useEffect, useState } from 'react';

const UserPosition = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  
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

  return location;
};
export default UserPosition;
