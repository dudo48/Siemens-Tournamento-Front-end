import OutlinedButton from "@/components/buttons/outlined-button";
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
          <Subtitle>Your are logged in!</Subtitle>
          <Link className='rounded-full' href={'/tournaments'}>
            <GradientButton type='light'>Go now</GradientButton>
          </Link>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <Link className='rounded-full' href={'/tournaments'}>
            <OutlinedButton icon={BsArrowRight}>Join Tournament</OutlinedButton>
          </Link>
          <Link className='rounded-full' href={'/tournaments'}>
            <OutlinedButton icon={BsPlusLg}>Create Tournament</OutlinedButton>
          </Link>
        </div>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>Connections</Subtitle>
          <Link className='rounded-full' href='/connections'>
            <GradientButton type='light'>Connect</GradientButton>
          </Link>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <Link className='rounded-full' href={'/connections'}>
            <OutlinedButton icon={BsArrowRight}>Connections List</OutlinedButton>
          </Link>
        </div>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>Statistics</Subtitle>
        </div>
        <div className='flex flex-col gap-1 items-start'>
          <Link className='rounded-full' href={'/statistics'}>
            <OutlinedButton icon={BsArrowRight}>View Statistics</OutlinedButton>
          </Link>
        </div>
      </section>
      {/* <section>
        <Subtitle>LAST TOURNAMENTS</Subtitle>
        <ul className='flex flex-col gap-1'>
          <TournamentHistoryLi id={1} key={1} name='Champions League' sport={Sport.Football} position={1} />
          <TournamentHistoryLi id={2} key={2} name='Champions League' sport={Sport.TableTennis} position={5} />
        </ul>
      </section> */}
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;