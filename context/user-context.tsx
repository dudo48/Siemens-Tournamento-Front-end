import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const UserContext = createContext({} as {[key: string]: any});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    setUser(userJson ? JSON.parse(userJson) : null);
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;