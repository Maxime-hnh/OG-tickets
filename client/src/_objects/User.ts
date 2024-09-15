import {AuthRole} from "@/_services/authentication.service";

export type UserProps = Partial<{
  id: number;
  cur: string;
  email: string;
  firstName: string;
  lastName:string;
  role:AuthRole;
}>;

export type FetchedUser = {
  id: number;
} & UserProps;

export class UserSignup implements UserProps{
  email = "";
  firstName = "";
  lastName = "";
  password = "";
  confirmPassword = "";
}