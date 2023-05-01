import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import TournamentLi from "@/components/list items/tournament-li";
import { Sport } from "@/utils/types";

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
          <div className='w-full flex items-end gap-2'>
            <SquareInput attributes={{name: 'tournamentCode', type: 'text', placeholder: 'Tournament code', value: code, onChange: handleChange}} label='Tournament code'  />
            <GradientButton type='light'>Join</GradientButton>
          </div>
        </Form>
      </section>
      <section>
        <Subtitle>AVAILABLE TOURNAMENTS</Subtitle>
        <ul>
          <TournamentLi key={1} name='Champions League' sport={Sport.Football}>
            <GradientButton type='light'>Join</GradientButton>
          </TournamentLi>
          <TournamentLi key={2} name='Champions League' sport={Sport.TableTennis}>
            <GradientButton type='light'>Join</GradientButton>
          </TournamentLi>
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;