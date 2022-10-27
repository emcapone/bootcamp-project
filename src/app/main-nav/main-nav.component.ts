import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loggedIn$ = this.userService.loggedIn$;

  firstName$ = this.userService.firstName$;

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) { }

  logout() {
    this.userService.logout();
  }

}
