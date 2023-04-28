import Title from "@/components/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import FinishedTournamentLi from "@/components/finished-tournament-li";

const Page = () => {
  return (
    <>
      <Title>History</Title>
      <section>
        <ul className='flex flex-col gap-1'>
          <FinishedTournamentLi key={1} name='Champions League' sport='Football' position={1} />
          <FinishedTournamentLi key={2} name='Champions League' sport='TableTennis' position={5} />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;