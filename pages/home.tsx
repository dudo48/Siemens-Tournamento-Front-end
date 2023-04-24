import GradientButton2 from "@/components/gradient-button-2";
import IconButton from "@/components/icon-button";
import SubTitle from "@/components/sub-title";
import Title from "@/components/title";
import TournamentListItem from "@/components/tournament-list-item";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";

const Page = () => {
  return (
    <>
      <Title>Home</Title>
      <section>
        <div className='flex justify-between items-center'>
          <SubTitle>YOU ARE IN!</SubTitle>
          <GradientButton2>GO NOW</GradientButton2>
        </div>
        <div className='flex flex-col gap-1 w-48'>
          <IconButton icon={BsArrowRight}>Join Tournament</IconButton>
          <IconButton icon={BsPlusLg}>Create Tournament</IconButton>
        </div>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <SubTitle>MAKE CONNECTIONS</SubTitle>
          <GradientButton2>CONNECT</GradientButton2>
        </div>
        <div className='flex flex-col gap-1 w-48'>
          <IconButton icon={BsArrowRight}>Connections List</IconButton>
        </div>
      </section>
      <section>
        <SubTitle>LAST TOURNAMENTS</SubTitle>
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