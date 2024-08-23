export type UserProps = Partial<{
  id: number;
  cur: string;
  email: string;
  fullname: string;
  phone: string;
  name: string;
  role:string;
  cgvCheck: boolean;
}>;

export type FetchedUser = {
  id: number;
} & UserProps;
