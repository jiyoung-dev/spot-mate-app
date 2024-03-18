import React from 'react';
import { useParams } from 'react-router-dom';

import { PLACES } from 'src/_mock/place';
import PlaceList from '../components/PlaceList';

// User별 장소를 fetch하고, 렌더링하는 역할
const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = PLACES.filter((place) => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
