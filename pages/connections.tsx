import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import UserLi from "@/components/list items/user-li";

const Page = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Connections</Title>
        <GradientButton type='light'>Connect</GradientButton>
      </div>
      <section>
        <ul className='flex flex-col gap-1'>
          <UserLi key={1} name='Fady Emad'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
          <UserLi key={2} name='Muhammad Salah'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
          <UserLi key={3} name='Abdalla Fadl'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
          <UserLi key={4} name='Abdallah Amer'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
          <UserLi key={5} name='Ahmed Elgarf'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
          <UserLi key={6} name='Radwa Ahmed'>
            <GradientButton type='red'>Delete</GradientButton>
          </UserLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;