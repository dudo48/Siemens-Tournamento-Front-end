import MainLayout from "@/layouts/main-layout";
import { ReactNode } from "react";

const Page = () => {
  return (
    <p>Hello</p>
  );
}

Page.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>

export default Page;