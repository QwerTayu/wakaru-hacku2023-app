import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { col, auth } from "@/firebase";
import {  doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

import UserPosition from './UserPosition';
import StopSharing from "@/components/StopSharing";

export default function PlaceInfo () {

    const [users, setUsers] = useState([]);

    // const userPositionValue = UserPosition();
    // const [docRef, setDocRef] = useState(null);
    // useEffect(() => {
    //   if (auth.currentUser) {
    //     const newDocRef = doc(col, auth.currentUser.uid);
    //     setDocRef(newDocRef);
    //     const unsubscribe = () => {
    //         updateDoc(newDocRef, {placeLat: userPositionValue.latitude});
    //         updateDoc(newDocRef, {placeLng: userPositionValue.longitude});
    //     };
    //     return () => unsubscribe();
    //   };
    // }, [auth.currentUser, userPositionValue]);

    const docRef = doc(col, auth.currentUser.uid);
    
    const userPositionValue = UserPosition();

    updateDoc(docRef, {placeLat: userPositionValue.latitude});
    updateDoc(docRef, {placeLng: userPositionValue.longitude});

    useEffect(() => {
        // データベースからデータを取得する
        const userData = col;
        getDocs(userData).then((snapShot) => {
            // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setUsers(snapShot.docs.map((doc) => ({ ...doc.data() })));

            // リアルタイムで取得
            onSnapshot(userData, (user) => {
                setUsers(user.docs.map((doc) => ({ ...doc.data() })));
            });
        });

    }, []);

    StopSharing(users);

    return (
        <>
            {users.filter((user) => user.isInOffice === true).map((user) => (
                <div key={user.id}>
                    <MarkerF
                    position={{
                        lat: user.placeLat,
                        lng: user.placeLng,
                    }}
                    icon={{
                        url: "/userIcon.png",
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(30, 30),
                        scaledSize: new window.google.maps.Size(60, 60),
                    }}
                    />
                    <InfoWindowF
                        position={{
                            lat: user.placeLat,
                            lng: user.placeLng,
                        }}
                    >
                        <div className={styles.markerWindow}>
                            <h1>{user.username.substring(0, 5)}</h1>
                            <h2>-{user.outTimeHour}:{user.outTimeMinute}</h2>
                        </div>
                    </InfoWindowF>
                </div>
            ))}
        </>
    );
};

