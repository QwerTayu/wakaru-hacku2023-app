import { InfoWindow, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React from "react";
import styles from "./Map.module.css";

export default function PlaceInfo () {
    const places = [
        { info: "info1", location: { lat: 35.048225, lng: 139.49701 } },
        { info: "info2", location: { lat: 36.048225, lng: 140.49701 } },
    ];

    return (
        <>
            {places.map((marker) => (
                // <MarkerF
                // key={marker.info}
                // position={{
                //     lat: marker.location.lat,
                //     lng: marker.location.lng,
                // }}
                // icon={{
                //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
                //     origin: new window.google.maps.Point(0, 0),
                //     anchor: new window.google.maps.Point(15, 15),
                //     scaledSize: new window.google.maps.Size(30, 30),
                // }}
                // />
                <InfoWindowF position={{
                    lat: marker.location.lat,
                    lng: marker.location.lng,
                }}>
                    <div className={styles.markerWindow}>
                        <h1>秋葉原オフィス</h1>
                    </div>
                </InfoWindowF>
            ))}
        </>
    );
};

