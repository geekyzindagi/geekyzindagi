export type Role = 'ADMIN' | 'USER' | 'MODERATOR' | 'SUPER_ADMIN';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'DELETED';

export interface User {
    id: string;
    email: string;
    username: string;
    fullName?: string;
    avatar?: string;
    role: Role;
    status: UserStatus;
    mfaEnabled: boolean;
    mfaVerified: boolean;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    mfaRequired: boolean;
    tempUserId?: string;
}
