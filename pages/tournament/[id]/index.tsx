import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { BsArrowRight, BsPlus, BsPlusLg, BsStar } from "react-icons/bs";
import TournamentHistoryLi from "@/components/list items/tournament-history-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import TournamentLi from "@/components/list items/tournament-li";
import { Sport } from "@/utils/types";
import ListItem from "@/components/list items/list-item";
import { sportsIcons } from "@/utils/mappings";
import StateLabel from "@/components/misc/state-label";
import { IoShirtOutline } from "react-icons/io5";
import TeamLi from "@/components/list items/team-li";
import UserLi from "@/components/list items/user-li";
import RadioGroup from "@/components/forms/radio-group";
import MatchLi from "@/components/list items/match-li";
import Standings from "@/components/misc/standings";

const Page = () => {
  const [assignment, setAssignment] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(assignment);
  }

  const handleChange = (event: ChangeEvent) => {
    setAssignment((event.target as HTMLInputElement).value);
    console.log(assignment);
  }

  return (
    <>
      <Title>Tournament Information</Title>
      <section>
        <ListItem title='FIFA World Cup' icon={sportsIcons.get(Sport.Football)} subtitle={Sport.Football}>
          <StateLabel type='orange'>Pending</StateLabel>
        </ListItem>
      </section>
      <section className='flex justify-between'>
        <div className='w-1/2'>
          <Subtitle>Code</Subtitle>
          <p>5qw4r5ewe12fd</p>
        </div>
        <div className='w-1/2'>
          <Subtitle>Manager</Subtitle>
          <p>Fady Emad</p>
        </div>
      </section>
      <section>
        <div className='flex items-center justify-between'>
          <Subtitle>Teams</Subtitle>
          <IconButton icon={BsPlusLg}>Create Team</IconButton>
        </div>
        <ul className='flex flex-col gap-1'>
          <TeamLi sport={Sport.Football} name='Zamalek' />
          <TeamLi sport={Sport.Football} name='Al Ahly' />
        </ul>
      </section>
      <section>
        <div className='flex items-center justify-between'>
          <Subtitle>Pending Requests</Subtitle>
          <IconButton icon={BsPlusLg}>Invite</IconButton>
        </div>
        <ul className='flex flex-col gap-1'>
          <UserLi name='Ahmed Sabry'>
            <GradientButton type='light'>Accept</GradientButton>
          </UserLi>
        </ul>
      </section>
      <section>
        <Subtitle>Options</Subtitle>
        <Form attributes={{onSubmit: handleSubmit}}>
          <RadioGroup attributes={{name: 'assignment', onChange: handleChange}} label='Manual Assignment' choices={['Yes', 'No']} />
          <GradientButton type='light'>Start</GradientButton>
        </Form>
      </section>
      <section>
        <Subtitle>Matches</Subtitle>
        <ul className='flex flex-col gap-1'>
          <MatchLi homeTeam='Zamalek' awayTeam='Al Ahly'>VS</MatchLi>
          <MatchLi homeTeam='Zamalek' awayTeam='Al Ahly'>3 - 1</MatchLi>
        </ul>
      </section>
      <section>
        <Subtitle>Standings</Subtitle>
        <Standings headers={['Team', 'Points']} teams={[['Zamalek', 86], ['Al Ahly', 54]]} />
      </section>
      <section>
        <Subtitle>Statistics</Subtitle>
        <ListItem key={3} icon={BsStar} title='Zamalek' subtitle='Most Goals'>
          <p className='text-tournamento-400 text-3xl'>65</p>
        </ListItem>
        <ListItem key={3} icon={BsStar} title='Al Ahly' subtitle='Consecutive Defeats'>
          <p className='text-tournamento-400 text-3xl'>10</p>
        </ListItem>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;