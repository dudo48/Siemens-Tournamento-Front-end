import { useNotifications } from "@/services/notifications-service";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user-context";

export const NotificationsContext = createContext({} as {[key: string]: any});

const NotificationsContextProvider = ({ children }: PropsWithChildren) => {
  const { user } = useContext(UserContext);
  const { notifications, mutate } = useNotifications(user.id);

  console.log(notifications);

  return (
    <NotificationsContext.Provider value={{notifications, mutate}}>
      {children}
    </NotificationsContext.Provider>
  );
}
 
export default NotificationsContextProvider;