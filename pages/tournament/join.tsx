import IconButton from "@/components/icon-button";
import Subtitle from "@/components/subtitle";
import Title from "@/components/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import FinishedTournamentLi from "@/components/finished-tournament-li";
import GradientButton from "@/components/gradient-button";
import Link from "next/link";
import Form from "@/components/form";
import SquareInput from "@/components/square-input";
import TournamentLi from "@/components/tournament-li";

const Page = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(code);
  }

  const handleChange = (event: ChangeEvent) => {
    setCode((event.target as HTMLInputElement).value);
    console.log(code);
  }

  return (
    <>
      <Title>Join Tournament</Title>
      <section>
        <Subtitle>JOIN BY CODE</Subtitle>
        <Form attributes={{onSubmit: handleSubmit}}>
          <div className='w-full flex items-end'>
            <SquareInput attributes={{name: 'tournamentCode', placeholder: 'Tournament code', onChange: handleChange}} label='Tournament code'  />
            <GradientButton type='light'>Join</GradientButton>
          </div>
        </Form>
      </section>
      <section>
        <Subtitle>AVAILABLE TOURNAMENTS</Subtitle>
        <ul>
        <TournamentLi key={1} name='Champions League' sport='Football' />
        <TournamentLi key={2} name='Champions League' sport='TableTennis' />
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;