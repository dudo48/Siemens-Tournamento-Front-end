import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import ListItem from "@/components/list items/list-item";
import { Bs1CircleFill, Bs2Circle, Bs2CircleFill, Bs3Circle, Bs3CircleFill, BsFillStarFill, BsHandThumbsDown, BsHeartbreak, BsStar, BsTrophy } from "react-icons/bs";
import StatisticsLi from "@/components/list items/statistics-li";

const Page = () => {
  return (
    <>
      <Title>Statistics</Title>
      <section>
        <ul className='flex flex-col gap-1'>
          <StatisticsLi key={1} icon={BsTrophy} title='First Place' count={2} />
          <StatisticsLi key={2} icon={Bs2Circle} title='Second Place' count={4} />
          <StatisticsLi key={3} icon={Bs3Circle} title='Third Place' count={3} />
          <StatisticsLi key={4} icon={BsStar} title='Win Streak' count={6} />
          <StatisticsLi key={5} icon={BsHandThumbsDown} title='Consecutive Defeats' count={4} />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;