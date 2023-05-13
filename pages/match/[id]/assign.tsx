import OutlinedButton from "@/components/buttons/outlined-button";
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
import StatusLabel from "@/components/misc/state-label";

const Page = () => {
  return (
    <>
      <Title>Available Teams</Title>
      <section>
        <ul className='flex flex-col gap-1'>
          <TeamLi name='Zamalek'>
            <GradientButton type='light'>Assign</GradientButton>
          </TeamLi>
          <TeamLi name='Al Ahly'>
            <GradientButton type='light'>Assign</GradientButton>
          </TeamLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;