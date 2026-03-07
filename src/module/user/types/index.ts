export type Role = "CUSTOMER" | "SHOPKEEPER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  role: Role;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
