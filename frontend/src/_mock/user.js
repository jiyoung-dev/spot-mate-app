import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

export const USERS = [...Array(24)].map((_, index) => ({
    id: `u${index + 1}`,
    name: faker.person.fullName(),
    image: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    places: sample([1, 2, 3, 4, 5]),
}));
