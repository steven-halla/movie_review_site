export interface User {
  id: number;
  email: string;
  displayName: string;
}

export interface UserProfile {
  id: number;
  displayName: number;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

