import OutlinedButton from "@/components/buttons/outlined-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode, useState } from "react";
import { BsArrowRight, BsDashLg, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import UserLi from "@/components/list items/user-li";
import TeamLi from "@/components/list items/team-li";
import TournamentStatusLabel from "@/components/misc/state-label";
import MatchLi from "@/components/list items/match-li";
import CircledIcon from "@/components/misc/circled-icon";
import CircledIconButton from "@/components/buttons/circled-icon-button";

const Page = () => {
  const [result, setResult] = useState([0, 0]);

  const editResult = (index: number, value: number) => {
    const newResult = result.slice();
    newResult[index] = Math.max(newResult[index] + value, 0);
    setResult(newResult);
  }

  return (
    <>
      <Title>Play Match</Title>
      <section className='flex flex-col gap-2'>
        <MatchLi homeTeam='Zamalek' awayTeam='Al Ahly'>
          {result[0]} - {result[1]}
        </MatchLi>
        <div className='flex justify-center items-center gap-8'>
          <div className='flex gap-2'>
            <CircledIconButton icon={BsPlusLg} attributes={{onClick: () => editResult(0, 1)}} />
            <CircledIconButton icon={BsDashLg} attributes={{onClick: () => editResult(0, -1)}} />
          </div>
          <p>Increment score</p>
          <div className='flex gap-2'>
            <CircledIconButton icon={BsPlusLg} attributes={{onClick: () => editResult(1, 1)}} />
            <CircledIconButton icon={BsDashLg} attributes={{onClick: () => editResult(1, -1)}} />
          </div>
        </div>
        <div className='self-center'>
          <GradientButton type='light'>End match</GradientButton>
        </div>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;