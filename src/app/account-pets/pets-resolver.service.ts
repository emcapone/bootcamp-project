import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
import { PetListItem } from "../pet-list-item";
import { PetService } from "../pet.service";

@Injectable({
  providedIn: "root"
})
export class PetsResolverService implements Resolve<PetListItem[]> {
  constructor(private _petService: PetService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PetListItem[]> {
    return this._petService.pets$;
  }
}
