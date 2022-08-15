import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        id: 1,
        firstName: 'Joseph',
        lastName: 'Quinn',
        birthday: new Date('11/12/2003'),
        email: 'j.quinn@gmail.com',
        password: 'Password123'
      },
      {
        id: 1,
        firstName: 'Millie',
        lastName: 'Brown',
        birthday: new Date('01/23/1991'),
        email: 'm.brown@gmail.com',
        password: 'Password123'
      }
    ]
    const pets = [
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
        petPhoto: '/assets/default.png',
        vetRecords: '/assets/vet-records.pdf',
        prescriptions: [{
          id: 1,
          name: 'Baytril',
          doctor: 'Dr. Young',
          due: new Date('04/17/2020'),
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
        petPhoto: '/assets/default.png',
        prescriptions: [{
          id: 1,
          name: 'Baytril',
          doctor: 'Dr. Young',
          due: new Date('04/17/2020'),
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
        petPhoto: '/assets/default.png',
        prescriptions: [{
          id: 1,
          name: 'Baytril',
          doctor: 'Dr. Young',
          due: new Date('04/17/2020'),
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
        },
        {
          id: 2,
          name: 'Tripawd',
          notes: 'Leg Amputated'
        }]
      },
      {
        id: 4,
        name: 'Ezra',
        breed: 'Domestic Shorthair',
        color: 'Brown',
        description: 'Hates kids',
        microchip: '7245565187654',
        sex: 'Male',
        fixed: true,
        weight: 4.3,
        birthday: new Date('11/12/2019'),
        adoptionDay: new Date('02/14/2020'),
        petPhoto: '/assets/default.png',
        prescriptions: [{
          id: 1,
          name: 'Baytril',
          doctor: 'Dr. Young',
          due: new Date('04/17/2020'),
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
    const events = [
      {
        id: 1,
        date: moment().day(3),
        allDay: true,
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 2,
        date: moment().day(12),
        allDay: true,
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 3,
        date: moment().day(12),
        allDay: true,
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 4,
        date: moment().day(20),
        allDay: true,
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 5,
        date: moment(),
        allDay: false,
        startTime: "03:30",
        endTime: "15:30",
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 6,
        date: moment().day(12),
        allDay: false,
        startTime: "11:30",
        endTime: "21:30",
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 7,
        date: moment(),
        allDay: false,
        startTime: "08:30",
        endTime: "17:30",
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      },
      {
        id: 8,
        date: moment().day(42),
        allDay: false,
        startTime: "03:30",
        endTime: "15:30",
        name: 'Test Event',
        details: 'details example. testing here. some extra text. examples test.'
      }
    ]
    const bookmarks = [
      {
        id: 0,
        link: '/v2/animals',
        title: 'test',
        note: 'test'
      }

    ]
    return { users, pets, events, bookmarks };
  }

  genId(ary: any[]): number {
    return ary.length > 0 ? Math.max(...ary.map(ary => ary.id)) + 1 : 11;
  }
}
