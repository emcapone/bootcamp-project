import { Pet } from './pet';

export const PETS: Pet[] = [
    {
        id: 1,
        name: 'Cassidy',
        breed: 'Domestic Shorthair',
        color: 'Brown',
        description: 'Hates kids',
        microchip: '7245565187654',
        sex: 'Male',
        fixed: false,
        weight: 4.3,
        birthday: new Date('11/12/2019'),
        adoptionDay: new Date('02/14/2020'),
        petPhoto: '/assets/cat.jpg',
        prescriptions: [{
          id: 1,
          name: 'Baytril',
          doctor: 'Dr. Young',
          due:  new Date('04/17/2020'),
          refills: 3
        }],
        vaccines: [{
            id: 1,
            name: 'Rabies',
            dateAdministered: new Date('12/16/2020'),
            dueDate: new Date('12/16/2021')
        }],
        conditions: [{
          id: 1,
          name: 'URI',
          notes: 'Baytril is to treat this infection. Should clear up this week.'
        }]
    },
    {
      id: 2,
      name: 'Hallie',
      breed: 'Domestic Shorthair',
      color: 'Brown',
      description: 'Hates kids',
      microchip: '7245565187654',
      sex: 'Female',
      fixed: false,
      weight: 4.3,
      birthday: new Date('11/12/2019'),
      adoptionDay: new Date('02/14/2020'),
      petPhoto: '/assets/cat.jpg',
      prescriptions: [{
        id: 1,
        name: 'Baytril',
        doctor: 'Dr. Young',
        due:  new Date('04/17/2020'),
        refills: 3
      }],
      vaccines: [{
          id: 1,
          name: 'Rabies',
          dateAdministered: new Date('12/16/2020'),
          dueDate: new Date('12/16/2021')
      }],
      conditions: [{
        id: 1,
        name: 'URI',
        notes: 'Baytril is to treat this infection. Should clear up this week.'
      }]
  },
  {
    id: 3,
    name: 'Megan',
    breed: 'Domestic Shorthair',
    color: 'Brown',
    description: 'Hates kids',
    microchip: '7245565187654',
    sex: 'Female',
    fixed: false,
    weight: 4.3,
    birthday: new Date('11/12/2019'),
    adoptionDay: new Date('02/14/2020'),
    petPhoto: '/assets/cat.jpg',
    prescriptions: [{
      id: 1,
      name: 'Baytril',
      doctor: 'Dr. Young',
      due:  new Date('04/17/2020'),
      refills: 3
    }],
    vaccines: [{
        id: 1,
        name: 'Rabies',
        dateAdministered: new Date('12/16/2020'),
        dueDate: new Date('12/16/2021')
    }],
    conditions: [{
      id: 1,
      name: 'URI',
      notes: 'Baytril is to treat this infection. Should clear up this week.'
    }]
},
{
  id: 4,
  name: 'Ezra',
  breed: 'Domestic Shorthair',
  color: 'Brown',
  description: 'Hates kids',
  microchip: '7245565187654',
  sex: 'Female',
  fixed: false,
  weight: 4.3,
  birthday: new Date('11/12/2019'),
  adoptionDay: new Date('02/14/2020'),
  petPhoto: '/assets/cat.jpg',
  prescriptions: [{
    id: 1,
    name: 'Baytril',
    doctor: 'Dr. Young',
    due:  new Date('04/17/2020'),
    refills: 3
  }],
  vaccines: [{
      id: 1,
      name: 'Rabies',
      dateAdministered: new Date('12/16/2020'),
      dueDate: new Date('12/16/2021')
  }],
  conditions: [{
    id: 1,
    name: 'URI',
    notes: 'Baytril is to treat this infection. Should clear up this week.'
  }]
}
]
