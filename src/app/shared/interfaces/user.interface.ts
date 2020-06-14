export interface User {
  _id: string;
  forename: string;
  surname: string;
  email: string;
  lastname: string;
  createdAt: string;
  license: string;
  isAdmin: boolean;
  groups: string[];
}
