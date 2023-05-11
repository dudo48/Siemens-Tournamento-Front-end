import GradientButton from "@/components/buttons/gradient-button";
import Form from "@/components/forms/form";
import RadioGroup from "@/components/forms/radio-group";
import Select from "@/components/forms/select";
import SquareInput from "@/components/forms/square-input";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useTournamentManagement } from "@/services/tournament-service";
import { sportsMatchDurations, sportsTeamMembers } from "@/utils/mappings";
import { Sport } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";


const schema = object({
  title: string().min(4, 'Please enter a name of at least 4 characters.').required('Please enter a tournament name of at least 4 characters.'),
  details: object({
    availability: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
    sport: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
    playgrounds: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
    membersCount: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
    matchDuration: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
  }).required()
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, resetField } = useForm<FormData>( {
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      details: {
        availability: '',
        sport: '',
        playgrounds: '',
        membersCount: '',
        matchDuration: ''
      }
    }
  });

  const { createTournament } = useTournamentManagement(user.id)

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const transformedData = { ...data } as {[key: string]: any}
    transformedData.details.availability = data.details.availability.toUpperCase();
    transformedData.details.sport = data.details.sport === 'Table Tennis' ? 'PINGPONG' : data.details.sport.toUpperCase();
    console.log(transformedData)

    const result = await createTournament(transformedData);
    console.log(result);

    if (result.status === true) {
      toast.success('Tournament was created successfully!');
      router.push('/tournaments');
    } else if (result.status === false) {
      toast.error(`Tournament creation failed: ${result.info}`);
    }
  }

  const chosenSport = watch('details.sport') as Sport;
  return (
    <>
      <Title>Create Tournament</Title>
      <section>
        <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
          <SquareInput error={errors.title} attributes={{...register('title')}} label='Tournament name'  />
          <RadioGroup error={errors.details?.availability} attributes={{...register('details.availability')}} choices={['Public', 'Private']} label='Availability' />
          <Select error={errors.details?.sport} attributes={{...register('details.sport', { onChange: () => {resetField('details.membersCount'); resetField('details.matchDuration')} })}} choices={Object.values(Sport)} label='Sport' />
          <Select error={errors.details?.playgrounds} attributes={{...register('details.playgrounds')}} choices={Array.from(Array(8).keys()).map(n => n + 1)} label='Number of playgrounds' />
          <Select error={errors.details?.membersCount} attributes={{...register('details.membersCount')}} choices={sportsTeamMembers.get(chosenSport) || []} label='Team members' />
          <Select error={errors.details?.matchDuration} attributes={{...register('details.matchDuration')}} choices={sportsMatchDurations.get(chosenSport) || []} label='Match duration (in minutes)' />
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='light' attributes={{type: 'submit'}}>Create tournament</GradientButton>}
          </div>
        </Form>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;