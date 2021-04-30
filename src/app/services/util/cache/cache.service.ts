import { Crate } from './../../../models/crates.model';
import { Injectable } from '@angular/core';
import { AuthModel } from 'src/app/models/auth/auth.model';
import { GST } from 'src/app/models/gst.model';
import { Organization } from 'src/app/models/organization.model';
import { VolumeUnit } from 'src/app/models/volumeUnit.model';

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
  authDetails: AuthModel;
  // authDetails=new BehaviorSubject<AuthModel>(null) ;
  organization: Organization;

  gst: GST[];
  volumeUnit: VolumeUnit[];
  crate: Crate[];

  constructor() { }
}
