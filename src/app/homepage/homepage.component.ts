import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  userSub!: Subscription;

  constructor(private userService: UserService, private router: Router) { }

  setUser(id: number): void {
    console.log(id);
    this.userService.setUser(id);
    setTimeout(() => this.router.navigate(['pets']), 1000);
  }

}
