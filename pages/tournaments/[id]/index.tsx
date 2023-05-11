import GradientButton from "@/components/buttons/gradient-button";
import OutlinedButton from "@/components/buttons/outlined-button";
import Form from "@/components/forms/form";
import RadioGroup from "@/components/forms/radio-group";
import TeamLi from "@/components/list items/team-li";
import TournamentLi from "@/components/list items/tournament-li";
import UserLi from "@/components/list items/user-li";
import LoadingFullscreen from "@/components/misc/loading-full-screen";
import LoadingSpinner from "@/components/misc/loading-spinner";
import TournamentStatusLabel from "@/components/misc/state-label";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useTeams } from "@/services/team-service";
import { useTournament, useTournamentPendingUsers, useTournamentPlayers, useTournamentPlayersManagement } from "@/services/tournament-service";
import { useProfile } from "@/services/user-service";
import { alternativeSportsNames } from "@/utils/mappings";
import { Sport, TournamentStatus, User } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactNode, useContext } from "react";
import { useForm } from "react-hook-form";
import { BsBoxArrowUpLeft, BsCheckCircle, BsClipboard, BsClock, BsPerson, BsPersonGear, BsPersonPlus, BsPinMap, BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";

const schema = object({
  assignment: string().min(1, 'Please select one of the options.').required('Please select one of the options.'),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { assignment: '' }
  });

  const { user } = useContext(UserContext);

  const router = useRouter();
  const tournamentId = parseInt(router.query.id as string, 10)

  const { tournament, isLoading: isTournamentLoading } = useTournament(tournamentId);
  const { tournamentPlayers, isLoading: isPlayersLoading, mutate: mutateTournamentPlayers } = useTournamentPlayers(tournamentId);
  const { pendingUsers, isLoading: isPendingUsersLoading, mutate: mutateTournamentPendingUsers } = useTournamentPendingUsers(tournamentId);
  const { teams, isLoading: isTeamsLoading } = useTeams(tournamentId);
  const { acceptUser } = useTournamentPlayersManagement(tournamentId);
  
  const { profile: manager } = useProfile(tournament?.managerId as number);

  console.log(teams);

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  const userIsManager = () => {
    return user.id !== manager?.id;
  }

  const acceptUserHandler = async (user: User) => {
    const result = await acceptUser(user.id);
    console.log(result);

    if (result.status) {
      toast.success('User was added successfully!');
    } else {
      toast.error(`Request failed to accept user.`);
    }

    mutateTournamentPendingUsers(pendingUsers.filter(u => u.id !== user.id));
    mutateTournamentPlayers(tournamentPlayers.concat(user));
  }

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(tournament?.details.code as string);
    toast.success('Invitation code copied to clipboard')
  }

  return isTournamentLoading ? <LoadingFullscreen /> : !tournament?.details ? null : (
    <>
      <Title>Tournament Information</Title>
      <section>
        <TournamentLi name={tournament.title} sport={alternativeSportsNames.get(tournament.details.sport) as Sport}>
          <TournamentStatusLabel status={tournament.details.state as TournamentStatus} >
            {tournament.details.state}
          </TournamentStatusLabel>
        </TournamentLi>
      </section>
      <section>
        
      </section>
      <section>
        <Subtitle>Tournament Details</Subtitle>
        <div className='flex justify-between flex-wrap'>
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <BsCheckCircle />
              <p className='font-semibold'>Availability</p>
            </div>
            {tournament.details.availability === 'PUBLIC' ? 'Public' : 'Private'}
          </div>
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <BsClock />
              <p className='font-semibold'>Match duration</p>
            </div>
            {tournament.details.matchDuration} minutes
          </div>
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <BsPinMap />
              <p className='font-semibold'>Number of playgrounds</p>
            </div>
            {tournament.details.grounds}
          </div>
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <BsPersonGear className='text-xl' />
              <p className='font-semibold'>Manager</p>
            </div>
            {`${manager?.firstName} ${manager?.lastName}`}
          </div>
          {userIsManager() &&
          <div className='text-center'>
            <div className='flex items-center gap-2'>
              <BsPersonPlus className='text-xl' />
              <p className='font-semibold'>Invitation code</p>
            </div>
            {tournament.details.code} <span><button onClick={copyCodeToClipboard}><BsClipboard /></button></span>
          </div>}
        </div>
      </section>
      <section>
        <div className='flex items-center justify-between'>
          <Subtitle>Teams</Subtitle>
          {userIsManager() && <OutlinedButton icon={BsPlusLg}>Create team</OutlinedButton>}
        </div>
        { isTeamsLoading ? <LoadingSpinner /> :
        !teams.length ? <p>There aren&apos;t any teams yet.</p> :
        <ul className='flex flex-col gap-1'>
          {teams.map(team => {
            const sport = alternativeSportsNames.get(tournament.details.sport);
            return (
              <TeamLi key={team.id} name={team.name} sport={sport as Sport} />
            )})}
        </ul>}
      </section>
      {userIsManager() && <>
        <section>
          <div className='flex items-center justify-between'>
            <Subtitle>Pending Requests</Subtitle>
            <OutlinedButton icon={BsPlusLg}>Invite</OutlinedButton>
          </div>
          { isPendingUsersLoading ? <LoadingSpinner /> :
          !pendingUsers.length ? <p>There aren&apos;t any pending requests.</p> :
          <ul className='flex flex-col gap-1'>
            {pendingUsers.map(pendingUser => (
              <UserLi key={pendingUser.id} name={`${pendingUser.firstName} ${pendingUser.lastName}`}>
                <GradientButton type='light' attributes={{onClick: () => acceptUserHandler(pendingUser)}}>Accept</GradientButton>
              </UserLi>))}
          </ul>}
        </section>
        <section>
          <Subtitle>Players</Subtitle>
          { isPlayersLoading ? <LoadingSpinner /> :
          !tournamentPlayers.length ? <p>There aren&apos;t any players yet.</p> :
          <ul className='flex flex-col gap-1'>
            {tournamentPlayers.map(player => (
              <UserLi key={player.id} name={`${player.firstName} ${player.lastName}`}>
              </UserLi>))}
          </ul>}
        </section>
        <section>
          <Subtitle>Options</Subtitle>
          <Form attributes={{onSubmit: handleSubmit(onSubmit)}}>
            <RadioGroup error={errors.assignment} attributes={{...register('assignment')}} label='Manual Assignment' choices={['Yes', 'No']} />
            <div className='self-center'>
              { isSubmitting ? <LoadingSpinner /> : <GradientButton type='light'>Start</GradientButton> }
            </div>
          </Form>
        </section>
      </>}
      {/* <section>
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
      </section> */}
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;