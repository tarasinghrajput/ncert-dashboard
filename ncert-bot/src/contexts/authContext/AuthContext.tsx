import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import { auth, User } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut

type AuthContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  logout: () => Promise<void>; // Add logout function to the context type
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setCurrentUser(null); // Clear the current user
      setUserLoggedIn(false); // Update userLoggedIn state
    } catch (error) {
      console.error("Error during logout:", error);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, userLoggedIn, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}