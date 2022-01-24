import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]> {
    return of(['One', 'Two', 'Three']);
  }

  postUserSettingsForm(userSettings: UserSettings) : Observable<any> {
    return this.httpClient.post('url', userSettings);
  }

}
