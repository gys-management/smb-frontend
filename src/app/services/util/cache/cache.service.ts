import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { OrganizationConfig } from 'src/app/models/order.model';
import { Organization } from 'src/app/models/organization.model';

/*
 * This service is used to hold values fetched from backend that won't change over time.
 * For instance, list of states in a country.
 *
 * Fetch the list of states once from the backend and store it in this service.
 * When it is needed somewhere else, fetch from this service instead of making an API call.
 */
@Injectable({
  providedIn: 'root',
})
export class CacheService {
  authDetails = new BehaviorSubject<AuthModel>(null);
  organization = new BehaviorSubject<Organization>(null);
  orgConfig = new BehaviorSubject<OrganizationConfig>(null);


  constructor() { }
}
