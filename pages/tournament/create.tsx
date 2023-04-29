import IconButton from "@/components/buttons/icon-button";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { BsArrowRight, BsPlusLg } from "react-icons/bs";
import FinishedTournamentLi from "@/components/list items/finished-tournament-li";
import GradientButton from "@/components/buttons/gradient-button";
import Link from "next/link";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import TournamentLi from "@/components/list items/tournament-li";
import RadioGroup from "@/components/forms/radio-group";
import Select from "@/components/forms/select";
import { Sport } from "@/utils/types";
import { sportsMatchDurations, sportsTeamMembers } from "@/utils/mappings";
import NumberInput from "@/components/forms/number-input";

const Page = () => {
  const [form, setForm] = useState<{[key: string]: string}>({
    name: '',
    sport: '',
    fieldsCount: ''
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(form);
  }

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value});
    console.log(form);
  }

  // reset selections regarding sport options
  const handleSportChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setForm({...form, [name]: value, fieldsCount: '', teamMembers: '', matchMinutes: ''});
    console.log(form);
  }

  const chosenSportEnum: Sport = Sport[form['sport'] as keyof typeof Sport];

  const sportChoices: string[] = Object.values(Sport);
  const sportValues: string[] = Object.keys(Sport);

  const fieldsCountChoices: number[] = Array.from(Array(8).keys()).map(n => n + 1);
  const teamMembersChoices: number[] = sportsTeamMembers.get(chosenSportEnum) || [];
  const matchMinutesChoices: number[] = sportsMatchDurations.get(chosenSportEnum) || [];

  return (
    <>
      <Title>Join Tournament</Title>
      <section>
        <Form attributes={{onSubmit: handleSubmit}}>
          <SquareInput attributes={{name: 'name', type: 'text', placeholder: 'Tournament name', value: form.name, onChange: handleChange}} label='Tournament name'  />
          <RadioGroup attributes={{name: 'availability', onChange: handleChange}} label='Availability' choices={['Public', 'Private']} />
          <Select attributes={{name: 'sport', value: form.sport, onChange: handleSportChange}} choices={sportChoices} label='Sport' values={sportValues} />
          <Select attributes={{name: 'fieldsCount', value: form.fieldsCount, onChange: handleChange}} choices={fieldsCountChoices} label='Number of fields' />
          <Select attributes={{name: 'teamMembers', value: form.teamMembers, onChange: handleChange}} choices={teamMembersChoices} label='Team members' />
          <Select attributes={{name: 'matchMinutes', value: form.matchMinutes, onChange: handleChange}} choices={matchMinutesChoices} label='Match duration (in minutes)' />
          <div>
            <GradientButton type='light'>Create</GradientButton>
          </div>
        </Form>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;