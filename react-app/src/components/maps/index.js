import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';


const Maps = ({ business }) => {

    const [mapLocation, setMapLocation] = useState()
    Geocode.setApiKey(process.env.API_KEY);

    Geocode.setLanguage('en');

    Geocode.setLocationType('ROOFTOP');

    Geocode.enableDebug();
    useEffect(() => {
        const genMap = () => {
            Geocode.fromAddress(`${business.address}, ${business.city}`).then(
                (response) => {
                    const { lat, lng } = response.results[0].geometry.location;
                    setMapLocation({ lat, lng });
                },
                (error) => {
                    console.error(error);
                }
            );
        };

        genMap();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.API_KEY
    })

    const containerStyle = {
        marginLeft: '10px',
        marginTop: '25px',
        width: '390px',
        height: '200px'
    };

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return (

        <div className="map_page__container">

            <div style={{ height: '400px', width: '400px' }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={8}
                    center={mapLocation}
                    onUnmount={onUnmount}
                >
                    <Marker key={business.id}
                        position={{ lat: mapLocation.lat, lng: mapLocation.lng }}
                        title={business.name}
                        icon={<i style={{ color: 'smokewhite', fontSize: '15px' }} class="fa-solid fa-location-dot" />}
                        streetView={false} />
                </GoogleMap>}
            </div>

        </div>
    );

}

export default Maps
