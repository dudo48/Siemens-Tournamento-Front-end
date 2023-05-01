import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import { Sport } from "@/utils/types";

const Page = () => {
  return (
    <>
      <Title>Home</Title>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>YOU ARE IN!</Subtitle>
          <GradientButton type='light'>Go now</GradientButton>
        </div>
        <div className='flex flex-col gap-1'>
        <Link className='rounded-full' href={'/tournament/join'}>
          <IconButton icon={BsArrowRight}>Join Tournament</IconButton>
        </Link>
        <Link className='rounded-full' href={'/tournament/create'}>
          <IconButton icon={BsPlusLg}>Create Tournament</IconButton>
        </Link>
        </div>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>MAKE CONNECTIONS</Subtitle>
          <GradientButton type='light'>Connect</GradientButton>
        </div>
        <div className='flex flex-col gap-1'>
          <Link className='rounded-full' href={'/connections'}>
            <IconButton icon={BsArrowRight}>Connections List</IconButton>
          </Link>
        </div>
      </section>
      <section>
        <Subtitle>LAST TOURNAMENTS</Subtitle>
        <ul className='flex flex-col gap-1'>
          <TournamentHistoryLi key={1} name='Champions League' sport={Sport.Football} position={1} />
          <TournamentHistoryLi key={2} name='Champions League' sport={Sport.TableTennis} position={5} />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;