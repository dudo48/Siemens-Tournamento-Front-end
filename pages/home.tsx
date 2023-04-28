import IconButton from "@/components/icon-button";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentListItem from "@/components/tournament-li";
import GradientButton from "@/components/gradient-button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Title>Home</Title>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>YOU ARE IN!</Subtitle>
          <GradientButton type='light'>Go now</GradientButton>
        </div>
        <div className='flex flex-col gap-1 w-48'>
          <IconButton icon={BsArrowRight}>Join Tournament</IconButton>
          <IconButton icon={BsPlusLg}>Create Tournament</IconButton>
        </div>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>MAKE CONNECTIONS</Subtitle>
          <GradientButton type='light'>Connect</GradientButton>
        </div>
        <div className='flex flex-col gap-1 w-48'>
          <Link className='rounded-full' href={'/connections'}>
            <IconButton icon={BsArrowRight}>Connections List</IconButton>
          </Link>
        </div>
      </section>
      <section>
        <Subtitle>LAST TOURNAMENTS</Subtitle>
        <ul className='flex flex-col gap-1'>
          <TournamentListItem key={1} name='Champions League' sport='Football' position={1} />
          <TournamentListItem key={2} name='Champions League' sport='TableTennis' position={5} />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;