import React from 'react';
import { useParams } from 'react-router-dom';

import { PLACES } from 'src/_mock/place';
import PlaceList from '../components/PlaceList';

// User별 장소를 fetch하고, 렌더링하는 역할
const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = React.useState();

    const userId = useParams().userId;

    const getPlacesByUserId = async () => {
        try {
            const response = await fetch(
                `http://localhost:5500/api/places/user/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const responseData = await response.json();
            setLoadedPlaces(responseData.places);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getPlacesByUserId();
    }, [userId]);

    return (
        // loadedPlaces가 있을때만 PlaceList 렌더링
        <>{loadedPlaces && <PlaceList items={loadedPlaces} />}</>
    );
};

export default UserPlaces;
