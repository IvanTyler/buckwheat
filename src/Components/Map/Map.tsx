import { useState, useEffect, useRef } from 'react';

import style from './Map.module.scss'
import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

export const MapContent: React.FC = () => {

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    useEffect(() => {
        let map = L.map('map').setView([55.892325, 37.52000], 15);

        map.on('click', function (e) {
            console.log(e.latlng.lat, e.latlng.lng);
        });
    })

    return (
        <div id="map" className={style.mapWrapper}>
            <MapContainer className={style.map} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}