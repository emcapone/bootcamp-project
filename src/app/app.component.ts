import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAdService } from './azure-ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Pawssier';

  //TO-DO: More error handling (500 page, etc)
  hasError = false;
  isUserLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadcastService: MsalBroadcastService,
    private authService: MsalService,
    private azureAdService: AzureAdService
  ) { }

  ngOnInit(): void {
    // Log-in status
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(_ => {
        this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;
        this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
        this.azureAdService.createUserProfileIfNotCreated$
      });

    this.azureAdService.createUserProfileIfNotCreated$.pipe(
      map(res => {
        if(res === false) {
          this.hasError = true;
        }
        return res;
      }),
      take(1),
    ).subscribe();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    this.authService.logoutRedirect({ postLogoutRedirectUri: environment.postLogoutUrl });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
