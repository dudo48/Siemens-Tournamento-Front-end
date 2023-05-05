import { useRouter } from "next/router";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as {[key: string]: any});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    setUser(userJson ? JSON.parse(userJson) : null);
    setAuthLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{authLoading, user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;