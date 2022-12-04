import { createContext, useContext } from "react";

type authContextType = {
  name: string | null,
  uid: string | null
  
}
const authContextDefaultValues: authContextType = {
  name: null,
  uid: null
};


const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useUser() {
    return useContext(AuthContext);
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const value = {
name,
uid
  }
  return (
      <>
          <AuthContext.Provider value={value}>
              {children}
          </AuthContext.Provider>
      </>
  );
}