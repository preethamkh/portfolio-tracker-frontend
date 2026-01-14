/**
 * Authentication Context
 *
 * Think of this as a C# service that manages user authentication state
 * It provies auth state and methods to the entire app via React Context API
 *
 * C# equivalent
 * public class AuthService
 * {
 *    public User CurrentUser { get; private set; }
 *    public bool IsAuthenticated => CurrentUser != null;
 *    public async Task<User> Login(string email, string password) { ... }
 * }
 *
 * But in React, we use Context and Hooks to achieve similar functionality across components
 * Instead of dependency injection, we use Context Providers
 *  */

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
} from "@/api/endpoints/auth";
import { setAuthToken, clearAuthToken, getAuthToken } from "@/api/client";
import { AuthUser, LoginRequest, RegisterRequest, AuthResponse } from "@/types";
import { STORAGE_KEYS, ROUTES } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";
import { parse } from "path";
import { set } from "date-fns";

// ============================================================================
// CONTEXT TYPE DEFINITION
// ============================================================================

interface AuthContextType {
  //State
  user: AuthUser | null;
  isAuthenticated: boolean;

  //Methods/Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

// ============================================================================
// CREATE CONTEXT
// ============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  // ============================================================================
  // INITIALIZE AUTH STATE ON MOUNT
  // ============================================================================

  /**
   * When the app loads, check if there's a saved token and user info in localStorage
   * If so, set the auth state accordingly
   * This is like checking if the user has a valid session.
   */
  useEffect(() => {
    /**
     * Initializes the authentication state by attempting to restore the user session
     * from local storage and the authentication token.
     *
     * - Retrieves the authentication token using `getAuthToken()`.
     * - Retrieves the saved user data from local storage using `STORAGE_KEYS.USER`.
     * - If both the token and user data are present, parses the user data and sets the user state.
     * - If an error occurs (e.g., invalid token or corrupted user data), clears the authentication token
     *   and user data from local storage, and logs the error.
     * - Regardless of outcome, sets the loading state to false.
     *
     * @remarks
     * This function is typically called when the authentication context provider component mounts,
     * such as within a `useEffect` hook in the `AuthContext` provider. Its purpose is to restore
     * the user's authentication state when the application is initialized or refreshed.
     */
    const initializeAuth = () => {
      try {
        const token = getAuthToken();
        const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

        if (token && savedUser) {
          // We have a token and user - restore auth state
          const parsedUser: AuthUser = JSON.parse(savedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        // Invalid token or user data - clear everything
        console.error("Failed to initialize auth state:", error);
        clearAuthToken();
        localStorage.removeItem(STORAGE_KEYS.USER);
        //setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);
}
