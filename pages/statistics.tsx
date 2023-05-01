import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import ListItem from "@/components/list items/list-item";
import { Bs1CircleFill, Bs2Circle, Bs2CircleFill, Bs3Circle, Bs3CircleFill, BsFillStarFill, BsHandThumbsDown, BsHeartbreak, BsStar, BsTrophy } from "react-icons/bs";

const Page = () => {
  return (
    <>
      <Title>Statistics</Title>
      <section>
        <ul className='flex flex-col gap-1'>
          <ListItem key={1} icon={BsTrophy} title='First Place'>
            <p className='text-tournamento-400 text-3xl'>3</p>
          </ListItem>
          <ListItem key={2} icon={Bs2Circle} title='Second Place'>
            <p className='text-tournamento-400 text-3xl'>6</p>
          </ListItem>
          <ListItem key={3} icon={Bs3Circle} title='Third Place'>
            <p className='text-tournamento-400 text-3xl'>2</p>
          </ListItem>
          <ListItem key={4} icon={BsStar} title='Win Streak'>
            <p className='text-tournamento-400 text-3xl'>1</p>
          </ListItem>
          <ListItem key={5} icon={BsHandThumbsDown} title='Consecutive Defeats'>
            <p className='text-tournamento-400 text-3xl'>7</p>
          </ListItem>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;