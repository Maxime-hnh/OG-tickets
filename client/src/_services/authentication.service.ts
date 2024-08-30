import {BehaviorSubject, Observable} from 'rxjs';
import {handleResponse} from "@/_helpers/handle-response";
import {FetchedUser} from "@/_objects/User";
import {authHeader} from "@/_helpers/auth-header";

export enum AuthRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class AuthenticationRequest {
  email = "";
  password = "";
}

export interface AuthenticatedUser {
  token: string;
  refreshToken: string;
  id: number;
  firstName: string;
  lastName: string;
  role: AuthRole;
}

class AuthenticationService {
  private readonly currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));

  currentUser: Observable<AuthenticatedUser | null> = this.currentUserSubject.asObservable();

  get currentUserValue(): AuthenticatedUser | null {
    return this.currentUserSubject.value;
  }

  async signup(body: any) {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(body),
    };
    const response = await fetch('/api/auth/signup', requestOptions);
    const user = await handleResponse(response)
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  async login(values: AuthenticationRequest): Promise<AuthenticatedUser | void> {
    const requestOptions = {
      method: 'POST',
      headers: {
        ...authHeader()
      },
      body: JSON.stringify(values),
    };
    const response = await fetch('/api/auth/login', requestOptions);
    const user = await handleResponse(response);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  async refreshToken(refreshToken: string): Promise<AuthenticatedUser | void> {
    const requestOptions = {
      method: 'POST',
      headers: {
        ...authHeader()
      },
      body: JSON.stringify(refreshToken),
    };
    const response = await fetch('api/auth/refreshToken', requestOptions);
    const user = await handleResponse(response);
    localStorage.setItem('CurrentUser', JSON.stringify((user)));
    this.currentUserSubject.next(user);
    return user;
  }

  isLogged():boolean {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
  }

  hasRole(role: AuthRole): boolean {
    return this.getRole() === role;
  }

  getRole(): AuthRole {
    if (this.isLogged()) {
      if (this.currentUserValue)
        return this.currentUserValue.role;
      return AuthRole.USER;
    }
    return AuthRole.USER;
  }

  async me(): Promise<FetchedUser | null> {
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
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

export const authenticationService = new AuthenticationService();