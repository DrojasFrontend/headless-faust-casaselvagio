"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import className from "classnames/bind";
import styles from "./Map.module.scss";
let cx = className.bind(styles);

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.437041393899676,
  lng: -4.191635586788259,
};

const GoogleMapComponent = () => {
  return (
    <section className="Map">
      <div className={cx("component")}>
        <div className="container">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapComponent;
