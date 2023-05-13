import ListItem from "@/components/list items/list-item";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useStatistics } from "@/services/user-service";
import { ReactNode, useContext } from "react";
import { Bs2Circle, Bs3Circle, BsHandThumbsDown, BsHandThumbsUp, BsStar, BsTrophy } from "react-icons/bs";

const Page = () => {
  const { user } = useContext(UserContext);
  const { statistics } = useStatistics(user.id);
  console.log(statistics)

  return !statistics ? <LoadingSpinner /> : (
    <>
      <Title>Statistics</Title>
      <p className='italic'>Across all tournaments</p>
      <section>
        <ul className='flex flex-col gap-1'>
          <ListItem icon={BsTrophy} title='First Place'>
            <p className='text-tournamento-400 text-3xl'>{statistics['All Winning Tournaments']}</p>
          </ListItem>
          <ListItem icon={Bs2Circle} title='Second Place'>
            <p className='text-tournamento-400 text-3xl'>{statistics['All Runner Up Tournaments']}</p>
          </ListItem>
          <ListItem icon={BsHandThumbsUp} title='Matches Won'>
            <p className='text-tournamento-400 text-3xl'>{statistics['All Winning Matches']}</p>
          </ListItem>
          <ListItem icon={BsHandThumbsDown} title='Matches Lost'>
            <p className='text-tournamento-400 text-3xl'>{statistics['All Losing Matches']}</p>
          </ListItem>
          <ListItem icon={BsStar} title='Points Scored'>
            <p className='text-tournamento-400 text-3xl'>{statistics['All Points']}</p>
          </ListItem>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;