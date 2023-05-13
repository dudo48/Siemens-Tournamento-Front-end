import GradientButton from "@/components/buttons/gradient-button";
import TeamLi from "@/components/list items/team-li";
import StatusLabel from "@/components/misc/state-label";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { Sport } from "@/utils/types";
import { ReactNode } from "react";

const Page = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Teams</Title>
        <GradientButton type='light'>Connect</GradientButton>
      </div>
      <section>
        <ul className='flex flex-col gap-1'>
          <TeamLi name='Zamalek' sport={Sport.Football}>
            <StatusLabel type='light'>Active</StatusLabel>
          </TeamLi>
          <TeamLi name='Al Ahly' sport={Sport.Football}>
            <StatusLabel type='red'>Out</StatusLabel>
          </TeamLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;