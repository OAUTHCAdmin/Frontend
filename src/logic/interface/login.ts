export const initialAPIState: FormState = {
  error: "",
  errors: {},
  success: false,
  isVerified: false,
  message: "",
  data: undefined,
};

export type FormState = {
  error?: string; // General error message (e.g., HTTP error)
  errors?: Record<string, string[]>; // Field-level validation errors
  success?: boolean;
  message?: string; // UI-friendly message like "Login successful"
  isVerified?: boolean; // Optional, for email verification status
  data?: LoginResponse; // Optional, in case you need the actual user data
  isLoading?: boolean;
};

export interface UserName {
  first: string;
  last: string;
}

export interface User {
  id: string;
  email: string;
  name: UserName;
  role: string;
}

export interface LoginResponseData {
  user: User;
}

export interface LoginResponse {
  message: string;
  data: LoginResponseData;
}


