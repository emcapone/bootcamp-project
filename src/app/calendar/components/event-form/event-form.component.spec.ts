import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { CalendarService } from '../../calendar.service';

import { EventFormComponent } from './event-form.component';

describe('AddEventComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;
  let mockCalendarService;

  beforeEach(async () => {
    mockCalendarService = {
      editCalendarEvent: () => { return of() },
      refreshEvents: () => { },
      addCalendarEvent: () => { return of() },
      selectEvent: () => { },
      events$: of()
    }
    await TestBed.configureTestingModule({
      imports: [
        MatSlideToggleModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CalendarService, useValue: mockCalendarService }
      ],
      declarations: [EventFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
