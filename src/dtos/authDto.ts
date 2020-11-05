export interface UserInput {
  username: string;
  email: string;
  password: string;
  phone: string;
  otpCode: string;
}

export interface UserDto {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  orders?: [string];
}
