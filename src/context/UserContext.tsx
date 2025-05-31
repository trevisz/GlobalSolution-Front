"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";

export type User = {
  id_usuario?: number;
  nome: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const userSalvo = localStorage.getItem("gsquizUser");
    if (userSalvo) {
      setUserState(JSON.parse(userSalvo));
    }
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("gsquizUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("gsquizUser");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
