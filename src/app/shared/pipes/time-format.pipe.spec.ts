import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(async () => {
    pipe = new TimeFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if value is undefined', () => {

    expect(pipe.transform(undefined)).toEqual('');

  });

  it('should throw an error if time has only letters for hours and/or minutes', () => {

    expect(() => { pipe.transform('as:fg') }).toThrow(new Error('Hours and minutes must not be letters.'));

  });

  it('should throw an error if the string is not in time format (00:00)', () => {

    expect(() => { pipe.transform('1245') }).toThrow(new Error('Time must be in 24-hr format: 00:00'));

  });

  it('should throw an error if minutes is not 0-59', () => {

    expect(() => { pipe.transform('12:78') }).toThrow(new Error('Minutes must be 0-59.'));

  });
  it('should throw an error if hours is not 0-23', () => {

    expect(() => { pipe.transform('25:30') }).toThrow(new Error('Hours must be 0-23.'));

  });

  it('should return 12:00 AM if time is 00:00', () => {

    expect(pipe.transform('00:00')).toEqual('12:00 AM');

  });

  it('should return 11:15 PM if time is 23:15', () => {

    expect(pipe.transform('23:15')).toEqual('11:15 PM');

  });

});
