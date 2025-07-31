import { createContext, useContext, useEffect, useState } from "react";
import { getKey, saveKey, getIv, saveIv, getSalt, saveSalt } from "./app/lib/keystore";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  key: CryptoKey | null;
  iv: Uint8Array | null;
  salt: Uint8Array | null;
  clearUser: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setKey: (key: CryptoKey | null) => void;
  setIv: (iv: Uint8Array | null) => void;
  setSalt: (salt: Uint8Array | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [key, setKeyState] = useState<CryptoKey | null>(null);
  const [iv, setIvState] = useState<Uint8Array | null>(null);
  const [salt, setSaltState] = useState<Uint8Array | null>(null);

  useEffect(() => {
    getKey().then(setKeyState).catch(() => setKeyState(null));
    getIv().then(setIvState).catch(() => setIvState(null));
    getSalt().then(setSaltState).catch(() => setSaltState(null));
  }, []);

  const setToken = (token: string | null) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    setTokenState(token);
  };

  const setUser = (user: User | null) => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
    setUserState(user);
  };

  const setKey =  (key: CryptoKey | null) => {
    if (key)  saveKey(key);
    setKeyState(key);
  };

  const setIv =   (iv: Uint8Array | null) => {
    if (iv)  saveIv(iv);
    setIvState(iv);
  };

  const setSalt =  (salt: Uint8Array | null) => {
    if (salt) saveSalt(salt);
    setSaltState(salt);
  };
  const clearUser = () => { 
    setUser(null)
    setToken(null)
  }
  return (
    <AuthContext.Provider
      value={{ token, user, key, iv, salt,clearUser , setToken, setUser, setKey, setIv, setSalt }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
