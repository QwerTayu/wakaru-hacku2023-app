import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import styles from "./Map.module.css";
import db from "@/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export default function PlaceInfo () {
    const places = [
        { info: "info1", location: { lat: 35.048225, lng: 139.49701 } },
        { info: "info2", location: { lat: 36.048225, lng: 140.49701 } },
    ];

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // データベースからデータを取得する
        const userData = collection(db, "user");
        getDocs(userData).then((snapShot) => {
            // console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setUsers(snapShot.docs.map((doc) => ({ ...doc.data() })));

            // リアルタイムで取得
            onSnapshot(userData, (user) => {
                setUsers(user.docs.map((doc) => ({ ...doc.data() })));
            });
        });
    }, []);

    return (
        <>
            {users.filter((user) => user.isInOffice === true).map((user) => (
                // <MarkerF
                // key={user.id}
                // position={{
                //     lat: user.placeLat,
                //     lng: user.placeLng,
                // }}
                // icon={{
                //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                //     origin: new window.google.maps.Point(0, 0),
                //     anchor: new window.google.maps.Point(15, 15),
                //     scaledSize: new window.google.maps.Size(30, 30),
                // }}
                // />
                <InfoWindowF
                    key={user.id}
                    position={{
                        lat: user.placeLat,
                        lng: user.placeLng,
                    }}
                >
                    <div className={styles.markerWindow}>
                        <h1>{user.username}</h1>
                    </div>
                </InfoWindowF>
            ))}
        </>
    );
};

