import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CalendarService } from '../../calendar.service';

import { ViewEventComponent } from './view-event.component';

describe('ViewEventComponent', () => {
  let component: ViewEventComponent;
  let fixture: ComponentFixture<ViewEventComponent>;
  let mockMatDialog, mockCalendarService;

  beforeEach(async () => {
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    mockCalendarService = {
      getDayEvents: () => { },
      deleteCalendarEvent: () => { return of() },
      refreshEvents: () => { }
    }
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: CalendarService, useValue: mockCalendarService }
      ],
      declarations: [ViewEventComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
