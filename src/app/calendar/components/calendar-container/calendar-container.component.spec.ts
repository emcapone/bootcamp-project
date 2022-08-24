import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalendarContainerComponent } from './calendar-container.component';

describe('CalendarContainerComponent', () => {
  let component: CalendarContainerComponent;
  let fixture: ComponentFixture<CalendarContainerComponent>;
  let mockMatSnackBar;

  @Component({
    selector: 'app-calendar',
    template: '<div></div>'
  })
  class FakeCalendarComponent {

    @Output()
    dateSelected: EventEmitter<moment.Moment> = new EventEmitter();

    @Output()
    monthSelected: EventEmitter<moment.Moment> = new EventEmitter();
  }

  beforeEach(async () => {
    mockMatSnackBar = jasmine.createSpyObj(['open']);
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatCardModule,
        MatTooltipModule
      ],
      providers: [
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ],
      declarations: [
        CalendarContainerComponent,
        FakeCalendarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
