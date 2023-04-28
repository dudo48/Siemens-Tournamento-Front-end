import IconButton from "@/components/icon-button";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import FinishedTournamentLi from "@/components/finished-tournament-li";
import GradientButton from "@/components/gradient-button";
import Link from "next/link";
import ConnectionLi from "@/components/connection-li";

const Page = () => {
  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Connections</Title>
        <GradientButton type='light'>Connect</GradientButton>
      </div>
      <section>
        <ul className='flex flex-col gap-1'>
          <ConnectionLi key={1} name='Fady Emad' />
          <ConnectionLi key={2} name='Muhammad Salah' />
          <ConnectionLi key={3} name='Abdalla Fadl' />
          <ConnectionLi key={4} name='Abdallah Amer' />
          <ConnectionLi key={5} name='Ahmed Elgarf' />
          <ConnectionLi key={6} name='Radwa Ahmed' />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;