'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { User, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
    login: (email: string, password: string, mfaToken?: string) => Promise<any>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
    verifyMfa: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        mfaRequired: false,
    });
    const router = useRouter();

    const loadUser = useCallback(async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setState((prev) => ({ ...prev, isLoading: false }));
            return;
        }

        try {
            const response = await apiClient.get<User>('/auth/me'); // We need a /me endpoint in backend
            console.log('loadUser success:', response.data);
            setState({
                user: response.data,
                isAuthenticated: true,
                isLoading: false,
                mfaRequired: false,
            });
        } catch (error) {
            console.error('loadUser failed:', error);
            localStorage.removeItem('access_token');
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    // Temporary storage for login credentials during MFA flow
    const [tempLoginData, setTempLoginData] = useState<{ email: string, password: string } | null>(null);

    const login = async (email: string, password: string, mfaToken?: string) => {
        try {
            const response = await apiClient.post<any>('/auth/login', { email, password, mfaToken });

            if (response.data.mfaRequired) {
                setTempLoginData({ email, password });
                setState((prev) => ({
                    ...prev,
                    mfaRequired: true,
                    tempUserId: response.data.userId,
                }));
                return response.data;
            }

            const { user, access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            // Set cookie for middleware (expires in 30 days)
            document.cookie = `access_token=${access_token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;

            setTempLoginData(null); // Clear temp data
            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
                mfaRequired: false,
            });
            return response.data;
        } catch (error) {
            setTempLoginData(null);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setTempLoginData(null);
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            mfaRequired: false,
        });
        router.push('/login');
    };

    const updateUser = (updatedFields: Partial<User>) => {
        setState((prev) => ({
            ...prev,
            user: prev.user ? { ...prev.user, ...updatedFields } : null,
        }));
    };

    const verifyMfa = async (token: string) => {
        if (!tempLoginData) {
            router.push('/login');
            throw new Error('Session expired. Please login again.');
        }

        try {
            // Call login again with the MFA token
            await login(tempLoginData.email, tempLoginData.password, token);
            router.push('/dashboard');
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout, updateUser, verifyMfa }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
