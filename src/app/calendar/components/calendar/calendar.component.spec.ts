import { Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { of } from 'rxjs';
import { CalendarService } from '../../calendar.service';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let mockRenderer2, mockCalendarService;

  beforeEach(async () => {
    mockRenderer2 = jasmine.createSpyObj(['listen', 'addClass', 'setAttribute', 'removeClass', 'removeAttribute']);
    mockCalendarService = {
      getStringEvents: () => { return of() },
      selectMonth: () => { }
    };
    await TestBed.configureTestingModule({
      imports: [
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        { provide: Renderer2, useValue: mockRenderer2 },
        { provide: CalendarService, useValue: mockCalendarService }
      ],
      declarations: [CalendarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
