import GradientButton from "@/components/buttons/gradient-button";
import ProfilePhoto from "@/components/images/profile-photo";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useProfile } from "@/services/user-service";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";

const Page = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const profileId = parseInt(router.query.id as string, 10)

  const { profile } = useProfile(profileId);
  console.log(profileId)
  console.log(profile)

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Profile</Title>
        {user.id === profileId && <Link href='/profile/edit'><GradientButton type='light'>Edit your profile</GradientButton></Link>}
      </div>
      <section className='flex flex-col'>
        <div className='flex items-center gap-4'>
          <div className='w-64'>
            <ProfilePhoto />
          </div>
          <div>
            <h1 className='text-3xl'>{`${profile?.firstName} ${profile?.lastName}`}</h1>
            <h2 className='text-lg'>{`${profile?.email}`}</h2>
          </div>
        </div>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;