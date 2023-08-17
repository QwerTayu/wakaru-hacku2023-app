import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { db, col, auth } from "@/firebase";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

import UserPosition from './UserPosition';

export default function PlaceInfo () {

    const [users, setUsers] = useState([]);

    const docRef = doc(col, auth.currentUser.uid);
    
    updateDoc(docRef, {placeLat: UserPosition().latitude});
    updateDoc(docRef, {placeLng: UserPosition().longitude});

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

    console.log(UserPosition());

    return (
        <>
            {users.filter((user) => user.isInOffice === true).map((user) => (
                <MarkerF
                key={user.id}
                position={{
                    lat: user.placeLat,
                    lng: user.placeLng,
                }}
                icon={{
                    url: "/userIcon.jpg",
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                    scaledSize: new window.google.maps.Size(30, 30),
                }}
                />
                // <InfoWindowF
                //     key={user.id}
                //     position={{
                //         lat: user.placeLat,
                //         lng: user.placeLng,
                //     }}
                // >
                //     <div className={styles.markerWindow}>
                //         <h1>{user.username}</h1>
                //     </div>
                // </InfoWindowF>
            ))}
        </>
    );
};

