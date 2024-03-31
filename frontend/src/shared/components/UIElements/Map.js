import React from 'react';

import './Map.css';

const Map = (props) => {
    const mapRef = React.useRef();

    const { center, zoom } = props;

    React.useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
        });

        new window.google.maps.Marker({
            map: map,
            position: center,
        });
    }, [center, zoom]);

    return (
        <div
            ref={mapRef}
            className={`map ${props.className}`}
            style={props.style}
        ></div>
    );
};

export default Map;
