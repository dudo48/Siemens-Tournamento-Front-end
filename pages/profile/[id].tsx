import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { useProfile } from "@/services/user-service";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Page = () => {
  const router = useRouter();
  const profileId = parseInt(router.query.id as string, 10)

  const { profile } = useProfile(profileId);
  console.log(profileId)
  console.log(profile)

  return (
    <>
      <Title>Profile</Title>
      <section>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;