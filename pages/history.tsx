import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode, useContext } from "react";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import { Sport } from "@/utils/types";
import { UserContext } from "@/context/user-context";
import { useStatistics } from "@/services/user-service";

const Page = () => {
  return (
    <>
      <Title>History</Title>
      {/* <section>
        <ul className='flex flex-col gap-1'>
          <TournamentHistoryLi id={22} key={1} name='Champions League' sport={Sport.Football} position={1} />
        </ul>
      </section> */}
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;