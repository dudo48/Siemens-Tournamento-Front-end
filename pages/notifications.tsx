import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import ListItem from "@/components/list items/list-item";
import { Bs1CircleFill, Bs2Circle, Bs2CircleFill, Bs3Circle, Bs3CircleFill, BsFillStarFill, BsHandThumbsDown, BsHeartbreak, BsStar, BsTrophy } from "react-icons/bs";
import Subtitle from "@/components/misc/subtitle";
import TournamentLi from "@/components/list items/tournament-li";
import GradientButton from "@/components/buttons/gradient-button";
import { Sport } from "@/utils/types";
import UserLi from "@/components/list items/user-li";

const Page = () => {
  return (
    <>
      <Title>Notifications</Title>
      <section>
        <Subtitle>Tournament invitations</Subtitle>
        <ul>
          <TournamentLi name='Egyptian PL' sport={Sport.Basketball}>
            <div className='flex gap-1'>
              <GradientButton type='light'>Accept</GradientButton>
              <GradientButton type='red'>Decline</GradientButton>
            </div>
          </TournamentLi>
        </ul>
      </section>
      <section>
        <Subtitle>Connections</Subtitle>
        <ul>
          <UserLi name='Ahmed Elgarf'>
            <div className='flex gap-1'>
              <GradientButton type='light'>Accept</GradientButton>
              <GradientButton type='red'>Decline</GradientButton>
            </div>
          </UserLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;