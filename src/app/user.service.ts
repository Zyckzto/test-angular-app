import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as httpClient from './fakeHTTPClient';

export type User = {
  name: string;
  admin: boolean;
}

const users: User[] = [
  {
    name: 'Alan',
    admin: true
  },
  {
    name: 'Sixto',
    admin: false
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUser(): Observable<User> {
    return httpClient.get(users[Math.random() < 0.5 ? 0 : 1]);
  }
}
