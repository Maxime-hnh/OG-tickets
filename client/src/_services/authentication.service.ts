import { BehaviorSubject, Observable } from 'rxjs';
import {handleResponse} from "@/_helpers/handle-response";
import {FetchedUser} from "@/_objects/User";
import {authHeader} from "@/_helpers/auth-header";

export enum AuthRole {
  USER = 'user',
  ADMIN = 'admin',
  CLIENT = 'client',
}

export interface AuthenticatedUser {
  token: string;
  fullname: string;
  role: AuthRole;
}

class AuthenticationService {
  private readonly currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));

  currentUser: Observable<AuthenticatedUser | null> = this.currentUserSubject.asObservable();

  get currentUserValue(): AuthenticatedUser | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Promise<AuthenticatedUser> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    return fetch('/api/auth/token', requestOptions)
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user as AuthenticatedUser;
      });
  }

  validateToken(key: string):Promise<AuthenticatedUser> {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`/api/user/checkLocalCouncilKey?key=${key}`, requestOptions)
      .then(handleResponse)
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user))
        this.currentUserSubject.next(user);
        return user
      })
  }

  signup(body: any) {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(body),
    };

    return fetch('/api/auth/signup', requestOptions)
      .then(handleResponse)
      .then((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      });
  }

  isLogged() {
    if(!localStorage.getItem('currentUser')) {
      return false;
    } else {
      return true;
    }
  }

  hasRole(role: AuthRole): boolean {
    return this.isLogged() && this.getRole() == role;
  }

  getRole(): AuthRole {
    if (this.isLogged()) {
      if(this.currentUserValue)
        return this.currentUserValue.role;
      return AuthRole.USER;
    }
    return AuthRole.USER;
  }

  me(): Promise<FetchedUser| null> {
    const requestOptions = {
      method: 'GET',
      headers: authHeader(),
    };

    return fetch('/api/auth/me', requestOptions)
      .then(handleResponse)
      .then((user) => {
        return user;
      });
  }


  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

export const authenticationService = new AuthenticationService();