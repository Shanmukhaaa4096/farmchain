import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AuthUser, UserRole, VerificationStatus } from '../types';
import { authService, StoredUserRecord } from '../services/authService';
import { sendOtpToPhone, verifyPhoneOtp, isDemoOtpMode } from '../lib/supabase';

export interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string; isDemo: boolean; error?: string }>;
  verifyOtp: (params: {
    phone: string;
    otp: string;
    role: UserRole;
    name?: string;
  }) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<AuthUser>) => Promise<AuthUser>;
  submitVerification: (docUrl: string, metadata?: { organization?: string; location?: string }) => Promise<AuthUser>;
  approveVerification: (userId: string) => Promise<void>;
  rejectVerification: (userId: string, reason: string) => Promise<void>;
  quickLoginAs: (role: UserRole) => void;
  getAllUsers: () => AuthUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USER: AuthUser = {
  id: 'usr-admin-01',
  username: 'farmchain_admin',
  mobileNumber: '9999999999',
  role: 'admin',
  name: 'FarmChain Security Desk',
  identifier: 'ADMIN: FC-SEC-01',
  organization: 'Smart India Hackathon Operations',
  location: 'National Oversight Hub, New Delhi',
  verificationStatus: 'verified',
  createdAt: '2026-01-01T00:00:00Z',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    return authService.getCurrentSession();
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    const session = authService.getCurrentSession();
    return session ? session.role : 'farmer';
  });

  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session) {
      setCurrentUser(session);
      setActiveRoleState(session.role);
    }
    setIsLoading(false);
  }, []);

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
  };

  const sendOtp = async (phone: string) => {
    const res = await sendOtpToPhone(phone);
    return res;
  };

  const verifyOtp = async (params: {
    phone: string;
    otp: string;
    role: UserRole;
    name?: string;
  }) => {
    const res = await verifyPhoneOtp(params.phone, params.otp);
    if (!res.success) {
      return { success: false, error: res.error || 'Verification failed.' };
    }

    const normalized = authService.normalizeMobile(params.phone);
    const nationalNumber = normalized.valid ? normalized.national : params.phone.replace(/\D/g, '');

    // Check existing stored users
    const allStored = authService.getStoredUsers();
    let existing = allStored.find(u => u.mobileNumber === nationalNumber);

    let userToSet: AuthUser;
    if (existing) {
      userToSet = {
        ...existing,
        role: params.role || existing.role,
        name: params.name?.trim() || existing.name,
      };
      const updatedList = allStored.map(u => u.id === existing!.id ? { ...userToSet } : u);
      authService.saveUsers(updatedList);
    } else {
      userToSet = {
        id: res.user?.id || `usr-${params.role}-${nationalNumber}`,
        username: `user_${nationalNumber.slice(-4)}`,
        mobileNumber: nationalNumber,
        role: params.role,
        name: params.name?.trim() || (params.role === 'farmer' ? 'Kisan Producer' : params.role === 'buyer' ? 'Wholesale Partner' : 'Fleet Operator'),
        identifier: authService.generateIdentifier(params.role),
        organization: params.role === 'farmer' ? 'Local Village Producer Group' : params.role === 'buyer' ? 'Procurement Desk' : 'Regional Cold Chain Fleet',
        location: params.role === 'farmer' ? 'Chevella, Telangana' : params.role === 'buyer' ? 'Hyderabad, Telangana' : 'National Highway 44 Fleet Hub',
        verificationStatus: 'unverified',
        createdAt: new Date().toISOString(),
      };
      authService.saveUsers([...allStored, userToSet]);
    }

    authService.setSession(userToSet);
    setCurrentUser(userToSet);
    setActiveRoleState(userToSet.role);

    return { success: true, user: userToSet };
  };

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    setActiveRoleState('farmer');
  }, []);

  const updateProfile = async (updates: Partial<AuthUser>): Promise<AuthUser> => {
    if (!currentUser) throw new Error('No user authenticated');

    const updated: AuthUser = {
      ...currentUser,
      ...updates,
      id: currentUser.id, // Immutable ID
    };

    const allStored = authService.getStoredUsers();
    const updatedList = allStored.map(u => u.id === currentUser.id ? { ...u, ...updated } : u);
    authService.saveUsers(updatedList);
    authService.setSession(updated);
    setCurrentUser(updated);

    return updated;
  };

  const submitVerification = async (docUrl: string, metadata?: { organization?: string; location?: string }): Promise<AuthUser> => {
    return updateProfile({
      verificationDocUrl: docUrl,
      verificationStatus: 'pending',
      ...(metadata?.organization ? { organization: metadata.organization } : {}),
      ...(metadata?.location ? { location: metadata.location } : {}),
    });
  };

  const approveVerification = async (userId: string): Promise<void> => {
    const allStored = authService.getStoredUsers();
    const updated = allStored.map(u => {
      if (u.id === userId) {
        return { ...u, verificationStatus: 'verified' as VerificationStatus, rejectionReason: undefined };
      }
      return u;
    });
    authService.saveUsers(updated);

    if (currentUser?.id === userId) {
      const refreshed = updated.find(u => u.id === userId);
      if (refreshed) {
        authService.setSession(refreshed);
        setCurrentUser(refreshed);
      }
    }
  };

  const rejectVerification = async (userId: string, reason: string): Promise<void> => {
    const allStored = authService.getStoredUsers();
    const updated = allStored.map(u => {
      if (u.id === userId) {
        return { ...u, verificationStatus: 'rejected' as VerificationStatus, rejectionReason: reason };
      }
      return u;
    });
    authService.saveUsers(updated);

    if (currentUser?.id === userId) {
      const refreshed = updated.find(u => u.id === userId);
      if (refreshed) {
        authService.setSession(refreshed);
        setCurrentUser(refreshed);
      }
    }
  };

  const quickLoginAs = (role: UserRole) => {
    if (role === 'admin') {
      authService.setSession(ADMIN_USER);
      setCurrentUser(ADMIN_USER);
      setActiveRoleState('admin');
      return;
    }

    const demoAccounts = authService.getDemoAccounts();
    const match = demoAccounts.find(a => a.role === role);
    if (match) {
      const stored = authService.getStoredUsers().find(u => u.mobileNumber === match.mobile);
      if (stored) {
        const withStatus: AuthUser = {
          ...stored,
          verificationStatus: 'verified',
        };
        authService.setSession(withStatus);
        setCurrentUser(withStatus);
        setActiveRoleState(role);
      }
    }
  };

  const getAllUsers = (): AuthUser[] => {
    const stored = authService.getStoredUsers();
    // Pre-populate verificationStatus if missing
    return stored.map(u => ({
      ...u,
      verificationStatus: u.verificationStatus || (u.id.includes('admin') || u.id.includes('01') ? 'verified' : 'pending'),
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        isLoading,
        isDemoMode: isDemoOtpMode,
        activeRole,
        setActiveRole,
        sendOtp,
        verifyOtp,
        logout,
        updateProfile,
        submitVerification,
        approveVerification,
        rejectVerification,
        quickLoginAs,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
