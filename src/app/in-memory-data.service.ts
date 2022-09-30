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
        firstName: 'Emily',
        lastName: 'Foglia',
        birthday: new Date('12/16/2000'),
        email: 'efoglia@ceiameria.com',
        password: 'Password123'
      }
    ]
    const events = [
      {
        id: 1,
        date: moment('2022-09-27T00:00:00.000'),
        allDay: false,
        startTime: "10:30",
        endTime: "11:00",
        name: 'Pawssier Demo Party',
        details: 'Celebration of the first Pawssier demo with coffee!'
      },
      {
        id: 2,
        date: moment('2022-09-28T00:00:00.000'),
        allDay: true,
        name: 'Torvi\'s Birthday',
        details: 'Torvi is turning 4!'
      },
      {
        id: 3,
        date: moment('2022-09-03T00:00:00.000'),
        allDay: true,
        name: 'Test Event',
        details: 'Currently inaccessible details...'
      },
      {
        id: 4,
        date: moment('2022-11-09T00:00:00.000'),
        allDay: true,
        name: 'God of War: Ragnarok Release',
        details: 'Don\'t forget to get the Amazon package!'
      },
      {
        id: 5,
        date: moment('2022-12-16T00:00:00.000'),
        allDay: true,
        name: 'Happy Birthday, Emily!',
        details: 'Birthday wishes for you from Pawssier!'
      },
      {
        id: 6,
        date: moment('2022-12-25T00:00:00.000'),
        allDay: true,
        name: 'Christmas',
        details: 'Merry Christmas!'
      },
      {
        id: 7,
        date: moment('2022-09-28T00:00:00.000'),
        allDay: false,
        startTime: "16:30",
        endTime: "17:30",
        name: 'Vet Visit: Coraline',
        details: 'Dental appointment, check-up and cleaning'
      },
      {
        id: 8,
        date: moment('2022-10-31T00:00:00.000'),
        allDay: true,
        name: 'Halloween',
        details: 'Don\'t furr-get to give your pets a treat!'
      },
      {
        id: 9,
        date: moment('2023-03-20T00:00:00.000'),
        allDay: true,
        name: 'Vaccine Due: Coraline',
        details: 'Coraline\'s Rabies vaccination is due today!'
      }
    ]

    return { users, events };
  }

  genId(ary: any[]): number {
    return ary.length > 0 ? Math.max(...ary.map(ary => ary.id)) + 1 : 11;
  }
}
