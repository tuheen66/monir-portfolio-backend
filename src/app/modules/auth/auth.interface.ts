export type TLoginUser = {
  userId?: string;
  email: string;
  password: string;
};

export interface IJwtPayload {
  userId: string;
  name: string;
  email: string;
  hasShop: boolean;
  role: 'user' | 'admin';
  isActive: boolean;
}
