import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { AzureAdService } from '../azure-ad.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {
  @Output() loginEvent: EventEmitter<any> = new EventEmitter();
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();

  loggedIn = false;
  firstName: string = "Pet Parent";

  private readonly _destroying$ = new Subject<void>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private azureAdService: AzureAdService) { }

  ngOnInit(): void {
    this.azureAdService.isUserLoggedIn.pipe(
      takeUntil(this._destroying$)
    ).subscribe(res => this.loggedIn = res);

    this.azureAdService.givenName$.pipe(
      takeUntil(this._destroying$)
    ).subscribe(res => this.firstName = res);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  logout() {
    this.logoutEvent.emit();
  }

  login() {
    this.loginEvent.emit();
  }

}
