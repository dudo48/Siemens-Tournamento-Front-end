import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import UserLi from "@/components/list items/user-li";
import TeamLi from "@/components/list items/team-li";
import StateLabel from "@/components/misc/state-label";

const Page = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Teams</Title>
        <GradientButton type='light'>Connect</GradientButton>
      </div>
      <section>
        <ul className='flex flex-col gap-1'>
          <TeamLi name='Zamalek'>
            <StateLabel type='light'>Active</StateLabel>
          </TeamLi>
          <TeamLi name='Al Ahly'>
            <StateLabel type='red'>Out</StateLabel>
          </TeamLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;