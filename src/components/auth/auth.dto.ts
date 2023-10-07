export type RegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  location: { lat: number; lng: number; city: string; state: string };
  disability?: string;
  avatar?: string;
};
