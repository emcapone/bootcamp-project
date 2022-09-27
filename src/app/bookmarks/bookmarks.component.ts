import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, Observable, of, Subscription, take } from 'rxjs';
import { Bookmark } from '../bookmark';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PetfinderPetDetails } from '../petfinder/petfinder-service/models';
import { PetfinderService } from '../petfinder/petfinder-service/petfinder.service';
import { BookmarkService } from '../bookmark.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit, OnDestroy {

  bookmarkSubscription!: Subscription;
  bookmarks!: Bookmark[];
  pet!: PetfinderPetDetails;
  selectedBookmark!: number | null;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Bookmark>;

  constructor(private bookmark: BookmarkService, private petfinder: PetfinderService, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookmarkSubscription = this.bookmark.bookmarks$.subscribe(res => {
      this.bookmarks = res;
      this.dataSource = new MatTableDataSource<Bookmark>(this.bookmarks);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.bookmarkSubscription.unsubscribe();
  }

  formatDate(date: Date) {
    return formatDate(date, 'M/d/yy, h:mm a', 'en-US');
  }

  deleteBookmark() {
    if (this.selectedBookmark) {
      this.bookmark.deleteBookmark(this.selectedBookmark).pipe(
        take(1)
      ).subscribe(_ => {
        this.isLoading = true;
        this.selectedBookmark = null;
        this.bookmark.refreshBookmarks();
      });
    } else {
      throw new Error('Bookmark is missing an ID.');
    }
  }

  openDialog(name: string) {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '50%',
      data: {
        title: 'Delete Bookmark: ' + name,
        message: 'This action cannot be undone. Are you sure?'
      }
    });
    dialog.afterClosed().pipe(
      take(1)
    ).subscribe(res => {
      if (res) {
        this.deleteBookmark();
      }
    });
  }

  clearActive(): void {
    var els = document.getElementsByClassName('active');
    for(let x of Array.from(els)){
      x.classList.remove('active');
    }
  }

  select(id: number, link: string) {
    this.isLoading = true;
    this.clearActive();
    this.selectedBookmark = id;
    this.petfinder.getPet(link).pipe(
      take(1),
      catchError(err => {
        console.log(err);
        return of();
      })
    ).subscribe(res => {
      this.pet = res.animal;
      document.getElementById(res.animal.id.toString())?.classList.add('active');
      this.isLoading = false;
    });
  }
}
