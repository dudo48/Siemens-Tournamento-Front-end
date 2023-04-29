import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import FinishedTournamentLi from "@/components/list items/finished-tournament-li";
import { Sport } from "@/utils/types";

const Page = () => {
  return (
    <>
      <Title>History</Title>
      <section>
        <ul className='flex flex-col gap-1'>
          <FinishedTournamentLi key={1} name='Champions League' sport={Sport.Football} position={1} />
          <FinishedTournamentLi key={2} name='Champions League' sport={Sport.TableTennis} position={5} />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;