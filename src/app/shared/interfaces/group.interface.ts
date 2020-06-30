import { User } from "./user.interface";

interface Member {
  _user: User;
  membership: string;
}

export interface Group {
  _id: string | null;
  name: string;
  description: string;
  privacy: string;
  members: Member[];
}
