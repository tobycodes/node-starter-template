import { LocationDto } from "@components/location";

export type UserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatarId?: number;
  location?: LocationDto;
};
