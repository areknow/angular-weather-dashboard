import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationsService {

  endpoint = 'locations/v1/cities/search';

  constructor(private http: HttpClient) { }

  /**
   * Return promise array of locations
   */
  getLocationData(query: string): Promise<any> {
    // Build endpoint
    const url = `${environment.accuWeather.url}/${this.endpoint}`;
    // Add params
    let params = new HttpParams();
    params = params.set('apikey', environment.accuWeather.key);
    params = params.set('q', query);
    // Make request
    return this.http.get(url, { params: params }).pipe(map((data: any) => data)).toPromise();
  }

}
