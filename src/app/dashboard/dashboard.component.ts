import { Component } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { PetfinderPetDetails } from '../petfinder/petfinder-service/models';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { PetListItem } from '../pet-list-item';
import { DashboardDetails } from './services/dashboard-details';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  apiUrl = environment.apiUrl + '/';
  bookmarkPet!: PetfinderPetDetails | null;
  pets!: PetListItem[];
  petfinderError = false;
  now!: moment.Moment;
  funFacts = [
    'Cats sleep for about 70% of their lives.',
    'Rabbit teeth never stop growing.',
    'Cats don\'t meow at each other.',
    'The average lifespan of a wild goldfish is 41 years.',
    'The first domesticated animal was a dog.',
    'A bird\'s heart beats 400 times per minute while at rest.',
    'Iguanas can hold their breath for 30 minutes.',
    'Dalmatians are born without spots.',
    'Hamsters originate from Syria.',
    'A chinchilla can leap over 6 feet.'
  ];
  randomNumber!: number;

  constructor(private activatedRoute: ActivatedRoute, private dashboardService: DashboardService) {
    this.randomNumber = Math.floor(Math.random() * 10);
    this.now = this.dashboardService.getDate();
    const routeData = this.activatedRoute.snapshot.data['data'];
    if (routeData.bookmarkedPet === null) {
      this.petfinderError = true;
    } else if (routeData.bookmarkedPet === undefined) {
      this.bookmarkPet = null;
    } else if (routeData.bookmarkedPet) {
      this.bookmarkPet = routeData.bookmarkedPet;
    }
    this.pets = routeData.pets;
  }

  getDate(): Date {
    return moment(this.now).toDate();
  }

  getRandomFunFact(): string {
    return this.funFacts[this.randomNumber];
  }

}
