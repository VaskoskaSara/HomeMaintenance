export enum UserType {
  Customer = 1,
  IndividualEmployee = 2,
  BusinessEmployee = 3,
}

export type RegistrationState = {
  userType: UserType;
  fullName: string;
  city: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  birthDate: Date;
  positionId: string;
  experience: number;
  price: number;
  avatar: FileList | File;
  photos: File[] | FileList;
};

export interface Position {
  id: string;
  positionName: string;
}

export interface ApiResponse<T> {
  data: T;
}

export type LoggedUser = {
  id: string;
  role: number;
};
