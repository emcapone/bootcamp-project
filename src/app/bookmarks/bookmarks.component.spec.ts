import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { BookmarkService } from '../bookmark.service';
import { PetfinderService } from '../petfinder/petfinder-service/petfinder.service';

import { BookmarksComponent } from './bookmarks.component';

describe('BookmarksComponent', () => {
  let component: BookmarksComponent;
  let fixture: ComponentFixture<BookmarksComponent>;
  let mockBookmarkService, mockChangeDetectorRef, mockPetfinderService, mockMatDialog;
  let mockBookmarks$;
  beforeEach(async () => {
    mockBookmarks$ = of({});
    mockBookmarkService = {
      deleteBookmark: () => { },
      refreshBookmarks: () => { },
      bookmarks$: mockBookmarks$
    };
    mockChangeDetectorRef = jasmine.createSpyObj(['detectChanges']);
    mockPetfinderService = jasmine.createSpyObj(['getPet']);
    mockMatDialog = jasmine.createSpyObj(['open', 'afterClosed']);
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      providers: [
        { provide: BookmarkService, useValue: mockBookmarkService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: PetfinderService, useValue: mockPetfinderService }
      ],
      declarations: [BookmarksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
