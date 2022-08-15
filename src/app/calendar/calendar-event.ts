import { Moment } from "moment";

export interface CalendarEvent {
  id?: number,
  date: Moment,
  allDay: boolean,
  startTime?: string,
  endTime?: string,
  name: string,
  details: string
}
