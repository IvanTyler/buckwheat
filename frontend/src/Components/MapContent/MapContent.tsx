import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import style from './MapContent.module.scss'
import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, TileLayer, Popup, useMapEvent } from "react-leaflet";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Sidebar } from '../Sidebar/Sidebar';
import { IMarkers } from "../../Interfaces/markers"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { IAdressMap } from '../../Interfaces/addressMap';

interface IDataProps {
    reference: any;
}

export const MapContent: React.FC<IDataProps> = ({ reference }) => {
    const dispatch = useDispatch()

    const [getMapCoordinates, setGetMapCoordinates] = useState<any[]>([])
    const [getMapAddressCountry, setGetMapAddressCountry] = useState('')
    const [getMapAddressStreet, setGetMapAddressStreet] = useState('')

    const [bottonAddAdress, setButtonAddAdress] = useState(true)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [showMarkers, setShowMarkers] = useState(true)

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    let markers: IMarkers[] = reference.data.titles.map((el: any, i: number) => {
        return {
            id: Math.floor(Math.random() * (100000000 - 999999999) + 100000000),
            title: el.name,
            description: reference.data.descriptions[i].name,
            position: [
                Number(`${37}` + '.0' + `${Math.floor(Math.random() * (200 - 300) + 300)}`),
                Number(`${-95}` + '.' + `${Math.floor(Math.random() * (6000 - 6200) + 6200)}`)
            ],
        }
    })

    function MyComponent() {
        useMapEvent('click', async (e) => {
            const lat = e.latlng.lat.toFixed(4)
            const lng = e.latlng.lng.toFixed(4)

            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)

            setGetMapAddressCountry((prev: any) => response.data.address.country)
            setGetMapAddressStreet((prev: any) => response.data.address.road)

            setGetMapCoordinates(prev => [+e.latlng.lat.toFixed(4), +e.latlng.lng.toFixed(4)])
        })
        return null
    }



    const getMarkersLocaleStorage = localStorage.getItem('markers')
    if (getMarkersLocaleStorage !== null) {
        const getMarkersLocaleStorageParse: IMarkers[] = JSON.parse(getMarkersLocaleStorage || '')
        markers = getMarkersLocaleStorageParse
    }

    const showSidebar = () => {
        setOpenSidebar(prev => prev = true)
        setButtonAddAdress(prev => prev = false)
        setShowMarkers(prev => prev = false)
    }

    return (
        <>
            <Sidebar
                reference={reference}
                openSidebar={openSidebar}
                getMapCoordinates={getMapCoordinates}
                getMapAddressCountry={getMapAddressCountry}
                getMapAddressStreet={getMapAddressStreet}
                markers={markers}
                setButtonAddAdress={setButtonAddAdress}
                setOpenSidebar={setOpenSidebar}
                setGetMapCoordinates={setGetMapCoordinates}
                setShowMarkers={setShowMarkers}
            />
            <MapContainer className={style.map} center={[37.0250, -95.6100]} zoom={15}>
                <MyComponent />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showMarkers && <div className={style.map__markers}>
                    {markers.length ?
                        markers.map((el: any, id: number) => {
                            return <Marker position={el.position} key={id}>
                                <Popup className={style.map__popup}>
                                    <h3>{el.title}</h3>
                                    <span className={style.description}>{el.description}</span>
                                </Popup>
                            </Marker>
                        }) : <p className={style.map__noAddresses}>Адреса отсутствуют</p>
                    }
                </div>
                }
            </MapContainer>
            {bottonAddAdress && <button onClick={() => showSidebar()} className={style.map__openSidebar}>Добавить адресс</button>}
        </>
    )
}