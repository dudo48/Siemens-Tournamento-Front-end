import { PropsWithChildren, createContext, useState } from "react";

export const UserContext = createContext({} as {[key: string]: any});

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;