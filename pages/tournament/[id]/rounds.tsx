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
import { Sport } from "@/utils/types";
import MatchLi from "@/components/list items/match-li";
import MatchUnassignedLi from "@/components/list items/match-unassigned-li";

const Page = () => {
  return (
    <>
      <Title>Rounds</Title>
      <section>
        <Subtitle>Round 1</Subtitle>
        <ul className='flex flex-col gap-1'>
          <MatchLi homeTeam='Zamalek' awayTeam='Al Ahly'>1 - 0</MatchLi>
          <MatchLi homeTeam='Pyramids' awayTeam='Al Ahly'>4 - 0</MatchLi>
        </ul>
      </section>
      <section>
        <Subtitle>Round 2</Subtitle>
        <ul className='flex flex-col gap-1'>
          <MatchLi homeTeam='Misr Lel Makassa' awayTeam='Al Ahly'>2 - 1</MatchLi>
          <MatchLi homeTeam='Arab Contractors' awayTeam='Al Ahly'>2 - 0</MatchLi>
        </ul>
      </section>
      <section>
        <Subtitle>Round 3</Subtitle>
        <ul className='flex flex-col gap-1'>
          <MatchUnassignedLi />
          <MatchUnassignedLi />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;