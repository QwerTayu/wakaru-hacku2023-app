import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { col, auth } from "@/firebase";
import {  doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

import UserPosition from './UserPosition';
import StopSharing from "@/components/StopSharing";

export default function PlaceInfo () {

    const [users, setUsers] = useState([]);
    const [nowTime, setNowTime] = useState(new Date());


    const docRef = doc(col, auth.currentUser.uid);
    
    const userPositionValue = UserPosition();


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

    setInterval(() => {
        setNowTime(new Date());
      }, 1000);

    useEffect(() => {
        StopSharing(users);
        // usersの中のドキュメントのどれかのreQuestReloadがtrueの場合、
        // そのドキュメントのreQuestReloadをfalseにする
        users.map((user) => {
            if (user.reQuestReload === true) {
                updateDoc(doc(col, user.id), {placeLat: userPositionValue.latitude});
                updateDoc(doc(col, user.id), {placeLng: userPositionValue.longitude});
                updateDoc(doc(col, user.id), {reQuestReload: false});
                console.log("リロードしました");
            };
        });
    }, [users, nowTime.getMinutes()]);

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
                            <h2>
                                -{String(user.outTimeHour).padStart(2, '0')}:{String(user.outTimeMinute).padStart(2, '0')}
                            </h2>
                        </div>
                    </InfoWindowF>
                </div>
            ))}
        </>
    );
};

