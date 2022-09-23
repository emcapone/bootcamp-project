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

    return { users, events };
  }

  genId(ary: any[]): number {
    return ary.length > 0 ? Math.max(...ary.map(ary => ary.id)) + 1 : 11;
  }
}
