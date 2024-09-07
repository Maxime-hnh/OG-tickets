import {AuthRole} from "@/_services/authentication.service";

export type UserProps = Partial<{
  id: number;
  cur: string;
  email: string;
  fullname: string;
  phone: string;
  name: string;
  role:AuthRole;
  cgvCheck: boolean;
}>;

export type FetchedUser = {
  id: number;
} & UserProps;