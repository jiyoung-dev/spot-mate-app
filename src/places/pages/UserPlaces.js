import React from 'react';

import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const PLACES = [
    {
        id: 'p1',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Tokyo_Tower_Afterglow.JPG/369px-Tokyo_Tower_Afterglow.JPG',
        title: 'Tokyo Tower',
        description: 'The second-tallest structure in Japan',
        address: '4 Chome-2-8 Shibakoen, Minato City, Tokyo 105-0011',
        location: {
            lat: 35.6585805,
            lng: 139.7428526,
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        imageUrl:
            'https://a.cdn-hotels.com/gdcs/production107/d507/f99efdcd-6fcc-4a97-a00c-cb6a491554b7.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        title: 'Eiffel Tower',
        description: 'Eiffel Tower in Paris',
        address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
        location: {
            lat: 48.85837,
            lng: 2.2896158,
        },
        creator: 'u2',
    },
];

// User별 장소를 fetch하고, 렌더링하는 역할
const UserPlaces = () => {
    const userId = useParams().userId;
    const loadedPlaces = PLACES.filter((place) => place.creator === userId);
    return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
