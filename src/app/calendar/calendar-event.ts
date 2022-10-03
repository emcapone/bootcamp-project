import { Moment } from "moment";

export interface CalendarEvent {
  id?: number,
  date: Moment | Date,
  allDay: boolean,
  startTime?: string,
  endTime?: string,
  name: string,
  details: string,
  link?: string
}
