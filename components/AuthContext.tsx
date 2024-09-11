import { auth } from "@/config/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, {
  createContext,
  useState,
  useEffect,
  FC,
  PropsWithChildren,
  useContext,
} from "react";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// Create the AuthProvider component
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Add Firebase authentication listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Function to handle user login
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
