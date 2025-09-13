export enum UserType {
  ELDER = 'elder',
  VOLUNTEER = 'volunteer'
}

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  userType?: UserType;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
}