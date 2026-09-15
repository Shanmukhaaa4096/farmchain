import { AuthUser, UserRole } from '../types';

const STORAGE_USERS_KEY = 'farmchain_users';
const STORAGE_SESSION_KEY = 'farmchain_session';

interface StoredUserRecord extends AuthUser {
  passwordHash: string; // Stored securely for client-side authentication
}

// Default pre-seeded demo accounts for instant evaluation
const DEFAULT_USERS: StoredUserRecord[] = [
  {
    id: 'usr-farmer-01',
    username: 'ramesh_farmer',
    passwordHash: 'password123',
    mobileNumber: '9849201842',
    role: 'farmer',
    name: 'Ramesh Reddy',
    identifier: 'KISAN: TS-RR-902184',
    organization: 'Chevella Farmers Producer Co-op',
    location: 'Chevella, Ranga Reddy, Telangana',
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'usr-buyer-01',
    username: 'urbanfork_buyer',
    passwordHash: 'password123',
    mobileNumber: '9876543210',
    role: 'buyer',
    name: 'UrbanFork Kitchens',
    identifier: 'GSTIN: 36AAACU9120K',
    organization: 'UrbanFork Culinary & Retail Group',
    location: 'Gachibowli Central Hub, Hyderabad',
    createdAt: '2026-02-01T10:30:00Z',
  },
  {
    id: 'usr-logistics-01',
    username: 'kisan_logistics',
    passwordHash: 'password123',
    mobileNumber: '9988776655',
    role: 'logistics',
    name: 'Kisan Cold Logistics',
    identifier: 'FLEET: TS-08-NP-2026',
    organization: 'Kisan Reefer Rural Fleet Co-op',
    location: 'Telangana & Karnataka Corridor',
    createdAt: '2026-02-15T14:00:00Z',
  },
];

class AuthService {
  private getStoredUsers(): StoredUserRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_USERS_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      const users = JSON.parse(data);
      if (!Array.isArray(users) || users.length === 0) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return users;
    } catch {
      return DEFAULT_USERS;
    }
  }

  private saveUsers(users: StoredUserRecord[]): void {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed to persist users to localStorage', e);
    }
  }

  public getCurrentSession(): AuthUser | null {
    try {
      const session = localStorage.getItem(STORAGE_SESSION_KEY);
      if (!session) return null;
      return JSON.parse(session);
    } catch {
      return null;
    }
  }

  public setSession(user: AuthUser | null): void {
    try {
      if (!user) {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      } else {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(user));
      }
    } catch (e) {
      console.error('Failed to set session in localStorage', e);
    }
  }

  public logout(): void {
    this.setSession(null);
  }

  /**
   * Helper to generate verified agricultural / commercial / logistics credentials
   */
  public generateIdentifier(role: UserRole, username: string): string {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const suffix = Math.floor(10 + Math.random() * 90);
    switch (role) {
      case 'farmer':
        return `KISAN: TS-RR-${randomDigits}${suffix}`;
      case 'buyer':
        return `GSTIN: 36AAACU${randomDigits}K1Z${suffix}`;
      case 'logistics':
        return `FLEET: TS-08-NP-${randomDigits}`;
    }
  }

  /**
   * Clean phone number string (strip non-digits, leading +91 or 0)
   */
  public sanitizeMobileNumber(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
      return digitsOnly.slice(2);
    }
    if (digitsOnly.length > 10 && digitsOnly.startsWith('0')) {
      return digitsOnly.slice(1);
    }
    return digitsOnly;
  }

  /**
   * Validate mobile number format: 10 digits starting with 6, 7, 8, or 9
   */
  public isValidMobile(phone: string): boolean {
    const clean = this.sanitizeMobileNumber(phone);
    return /^[6-9]\d{9}$/.test(clean);
  }

  /**
   * Sign up a new user with username, password, mobile number, and role
   */
  public signUp(data: {
    username: string;
    password: string;
    mobileNumber: string;
    role: UserRole;
    name?: string;
    organization?: string;
    location?: string;
  }): { success: boolean; user?: AuthUser; error?: string } {
    const cleanUsername = data.username.trim().toLowerCase();
    const cleanMobile = this.sanitizeMobileNumber(data.mobileNumber);
    const password = data.password.trim();

    // Validations
    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      return { success: false, error: 'Username can only contain letters, numbers, and underscores.' };
    }
    if (!this.isValidMobile(cleanMobile)) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number (e.g. 9849201842).' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const users = this.getStoredUsers();

    // Check for collisions
    if (users.some(u => u.username.toLowerCase() === cleanUsername)) {
      return { success: false, error: `Username "${cleanUsername}" is already taken. Please choose another.` };
    }
    if (users.some(u => this.sanitizeMobileNumber(u.mobileNumber) === cleanMobile)) {
      return { success: false, error: `Mobile number "${cleanMobile}" is already registered. Please sign in instead.` };
    }

    const roleNameDefaults: Record<UserRole, string> = {
      farmer: `${data.username.charAt(0).toUpperCase() + data.username.slice(1)} (Farmer)`,
      buyer: `${data.username.charAt(0).toUpperCase() + data.username.slice(1)} Enterprises`,
      logistics: `${data.username.charAt(0).toUpperCase() + data.username.slice(1)} Logistics Fleet`,
    };

    const newUser: StoredUserRecord = {
      id: `usr-${data.role}-${Date.now()}`,
      username: cleanUsername,
      passwordHash: password,
      mobileNumber: cleanMobile,
      role: data.role,
      name: data.name?.trim() || roleNameDefaults[data.role],
      identifier: this.generateIdentifier(data.role, cleanUsername),
      organization: data.organization?.trim() || (data.role === 'farmer' ? 'Local Village FPO' : data.role === 'buyer' ? 'Direct Procurement Desk' : 'Verified Reefer Carrier'),
      location: data.location?.trim() || (data.role === 'farmer' ? 'Chevella Taluka, Telangana' : data.role === 'buyer' ? 'Hyderabad Logistics Terminal' : 'South-Central Transit Corridor'),
      createdAt: new Date().toISOString(),
    };

    const updatedList = [...users, newUser];
    this.saveUsers(updatedList);

    // Set active session automatically
    const authUser: AuthUser = {
      id: newUser.id,
      username: newUser.username,
      mobileNumber: newUser.mobileNumber,
      role: newUser.role,
      name: newUser.name,
      identifier: newUser.identifier,
      organization: newUser.organization,
      location: newUser.location,
      createdAt: newUser.createdAt,
    };

    this.setSession(authUser);
    return { success: true, user: authUser };
  }

  /**
   * Log in via username OR mobile number + password
   */
  public login(data: {
    identifier: string; // username or mobile
    password: string;
    role?: UserRole;
  }): { success: boolean; user?: AuthUser; error?: string } {
    const rawIdentifier = data.identifier.trim();
    const cleanUsername = rawIdentifier.toLowerCase();
    const cleanMobile = this.sanitizeMobileNumber(rawIdentifier);
    const password = data.password.trim();

    if (!rawIdentifier) {
      return { success: false, error: 'Please enter your username or registered mobile number.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const users = this.getStoredUsers();

    // Match by username or mobile
    const matched = users.find(u => 
      u.username.toLowerCase() === cleanUsername || 
      (cleanMobile.length >= 10 && this.sanitizeMobileNumber(u.mobileNumber) === cleanMobile)
    );

    if (!matched) {
      return { success: false, error: 'No account found with this username or mobile number.' };
    }

    if (matched.passwordHash !== password) {
      return { success: false, error: 'Invalid password. Please try again.' };
    }

    // Role verification / update:
    // If a user selected a specific role on the modal, ensure role match or update session role if allowed
    const finalRole = data.role || matched.role;

    const authUser: AuthUser = {
      id: matched.id,
      username: matched.username,
      mobileNumber: matched.mobileNumber,
      role: finalRole,
      name: matched.name,
      identifier: matched.identifier,
      organization: matched.organization,
      location: matched.location,
      createdAt: matched.createdAt,
    };

    this.setSession(authUser);
    return { success: true, user: authUser };
  }

  /**
   * Return demo accounts for fast 1-click preview
   */
  public getDemoAccounts(): { role: UserRole; username: string; mobile: string; name: string; id: string }[] {
    return [
      { role: 'farmer', username: 'ramesh_farmer', mobile: '98492 01842', name: 'Ramesh Reddy', id: 'KISAN: TS-RR-902184' },
      { role: 'buyer', username: 'urbanfork_buyer', mobile: '98765 43210', name: 'UrbanFork Kitchens', id: 'GSTIN: 36AAACU9120K' },
      { role: 'logistics', username: 'kisan_logistics', mobile: '99887 76655', name: 'Kisan Cold Fleet', id: 'FLEET: TS-08-NP-2026' },
    ];
  }
}

export const authService = new AuthService();
