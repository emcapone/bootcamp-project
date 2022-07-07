import { Pet } from './pet';

export const PETS: Pet[] = [
    {
        id: 1,
        name: 'Cassidy',
        breed: 'Domestic Shorthair',
        sex: 'Male',
        birthday: new Date('11/12/2019'),
        microchip: '7245565187654',
        upcoming: 'Vet Visit (7/14/22)',
        vaccines: [{
            id: 1,
            name: 'Rabies',
            date: new Date('12/16/2020'),
            due: new Date('12/16/2021')
        }],
        imageUrl: '/assets/cat.jpg'
    },
    {
        id: 2,
        name: 'Hallie',
        breed: 'Domestic Shorthair',
        sex: 'Female',
        birthday: new Date('3/28/2021'),
        microchip: '1456123456321',
        upcoming: 'None (Add Event?)',
        vaccines: [{
            id: 1,
            name: 'Rabies',
            date: new Date('12/16/2020'),
            due: new Date('12/16/2021')
        }],
        imageUrl: '/assets/cat.jpg'
    },
    {
        id: 3,
        name: 'Megan',
        breed: 'Domestic Shorthair',
        sex: 'Female',
        birthday: new Date('12/02/2017'),
        microchip: '984531548632',
        upcoming: 'Rabies Vaccine Due (1/20/23)',
        vaccines: [{
            id: 1,
            name: 'Rabies',
            date: new Date('12/16/2020'),
            due: new Date('12/16/2021')
        }],
        imageUrl: '/assets/cat.jpg'
    },
    {
        id: 4,
        name: 'Ezra',
        breed: 'Domestic Shorthair',
        sex: 'Male',
        birthday: new Date('6/17/2010'),
        microchip: 'None (Add Microchip?)',
        upcoming: 'Vet Visit (8/10/22)',
        vaccines: [{
            id: 1,
            name: 'Rabies',
            date: new Date('12/16/2020'),
            due: new Date('12/16/2021')
        }],
        imageUrl: '/assets/cat.jpg'
    }
]
