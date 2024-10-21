import {BehaviorSubject, Observable} from 'rxjs';
import {handleResponse} from "@/_helpers/handle-response";
import {UserSignup} from "@/_objects/User";
import {authHeader} from "@/_helpers/auth-header";

export enum AuthRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class AuthenticationRequest {
  email? = "";
  password? = "";
  twoFactorCode? = "";
}

export interface AuthenticatedUser {
  accessToken: string;
  refreshToken: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: AuthRole;
}

class AuthenticationService {
  readonly loggedUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('loggedUser') ?? 'null'));

  loggedUser: Observable<AuthenticatedUser | null> = this.loggedUserSubject.asObservable();

  get loggedUserValue(): AuthenticatedUser | null {
    return this.loggedUserSubject.value;
  }

  async signup(body: UserSignup) {
    const requestOptions = {
      method: 'POST',
      headers: authHeader(),
      body: JSON.stringify(body),
    };
    return await handleResponse(await fetch(`/api/auth/signup`, requestOptions));
  }

  async login(step: number, values: AuthenticationRequest): Promise<AuthenticatedUser | void> {
    const requestOptions = {
      method: 'POST',
      headers: {
        ...authHeader()
      },
      body: JSON.stringify(values),
    };
    const response = await fetch(`/api/auth/login/step/${step}`, requestOptions);
    const user = await handleResponse(response);
    if (step === 1) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.loggedUserSubject.next(user);
    }
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
    localStorage.setItem('loggedUser', JSON.stringify((user)));
    this.loggedUserSubject.next(user);
    return user;
  }

  isLogged(): boolean {
    const loggedUser = localStorage.getItem('loggedUser');
    return loggedUser !== null;
  }

  hasRole(role: AuthRole): boolean {
    return this.getRole() === role;
  }

  getRole(): AuthRole {
    if (this.isLogged()) {
      if (this.loggedUserValue)
        return this.loggedUserValue.role;
      return AuthRole.USER;
    }
    return AuthRole.USER;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.loggedUserSubject.next(null);
  }
}

export const authenticationService = new AuthenticationService();