import Form from "@/components/forms/form";
import GradientButton from "@/components/buttons/gradient-button";
import SquareInput from "@/components/forms/square-input";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import OutlinedButton from "@/components/buttons/outlined-button";
import { BsPlusLg } from "react-icons/bs";
import TeamLi from "@/components/list items/team-li";
import { Sport } from "@/utils/types";
import Subtitle from "@/components/misc/subtitle";
import UserLi from "@/components/list items/user-li";

const Page = () => {
  return (
    <>
      <Title>Team</Title>
      <section>
        <TeamLi name='Zamalek' sport={Sport.Football}>
        </TeamLi>
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>Players</Subtitle>
          <OutlinedButton icon={BsPlusLg}>Add player</OutlinedButton>
        </div>
        <ul>
          <UserLi name='Radwa Ahmed' />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;