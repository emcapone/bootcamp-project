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

  it('should throw an error if input is not in 24-hour format', () => {

    expect(() => { pipe.transform('a1:25') }).toThrow(new Error('Time must be in 24-hr format: 00:00 - 23:59'));

  });

  it('should return 12:00 AM if time is 00:00', () => {

    expect(pipe.transform('00:00')).toEqual('12:00 AM');

  });

  it('should return 11:15 PM if time is 23:15', () => {

    expect(pipe.transform('23:15')).toEqual('11:15 PM');

  });

});
