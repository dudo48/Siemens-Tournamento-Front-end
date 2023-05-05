import { UserContext } from "@/context/user-context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    router.push(user ? '/home' : '/login');
  }, [user, router])
}
