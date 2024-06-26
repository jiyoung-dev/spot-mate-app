import React from 'react';
import { useParams } from 'react-router-dom';

import { PLACES } from 'src/_mock/place';
import PlaceList from '../components/PlaceList';
import useHttpClient from 'src/shared/hooks/useHttpClient';

// User별 장소를 fetch하고, 렌더링하는 역할
const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = React.useState();

    const [sendRequest] = useHttpClient();

    const userId = useParams().userId;

    const getPlacesByUserId = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5500/api/places/user/${userId}`,
                'GET'
            );
            setLoadedPlaces(responseData.places);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(loadedPlaces);

    // 장소가 삭제되면 트리거되는 함수
    const placeDeletedHandler = (deletedPlaceId) => {
        console.log(deletedPlaceId);
        setLoadedPlaces((prevPlaces) =>
            prevPlaces.filter((place) => place.id !== deletedPlaceId)
        );
    };

    React.useEffect(() => {
        getPlacesByUserId();
    }, [userId, sendRequest]);

    return (
        // loadedPlaces가 있을때만 PlaceList 렌더링
        <>
            {loadedPlaces && (
                <PlaceList
                    items={loadedPlaces}
                    onDeletePlace={placeDeletedHandler}
                />
            )}
        </>
    );
};

export default UserPlaces;
