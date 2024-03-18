import { faker } from '@faker-js/faker';

export const PLACES = [...Array(5)].map((_, index) => ({
    id: `p${index + 1}`,
    imageUrl: faker.image.imageUrl(),
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    address: faker.address.streetAddress(),
    location: {
        lat: parseFloat(faker.address.latitude()),
        lng: parseFloat(faker.address.longitude()),
    },
    creator: `u${index + 1}`,
}));
