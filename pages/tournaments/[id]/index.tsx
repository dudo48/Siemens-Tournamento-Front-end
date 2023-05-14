import GradientButton from "@/components/buttons/gradient-button";
import OutlinedButton from "@/components/buttons/outlined-button";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import ListItem from "@/components/list items/list-item";
import TeamLi from "@/components/list items/team-li";
import TournamentLi from "@/components/list items/tournament-li";
import UserLi from "@/components/list items/user-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Modal from "@/components/misc/modal";
import StatusLabel from "@/components/misc/state-label";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useTeamManagement, useTeams } from "@/services/team-service";
import { useMostScoringPlayer, useMostScoringTeam, useTournament, useTournamentManagement, useTournamentPendingUsers, useTournamentPlayers, useTournamentPlayersManagement, useTournamentRequests } from "@/services/tournament-service";
import { useProfile } from "@/services/user-service";
import { hasEnded, isPending, userIsManager } from "@/utils/functions";
import { alternativeSportsNames } from "@/utils/mappings";
import { Sport, Status, User } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsArrowRight, BsCheckCircle, BsClipboard, BsClock, BsPerson, BsPersonGear, BsPersonPlus, BsPinMap, BsPlusLg, BsStar } from "react-icons/bs";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";


const schemaInviteForm = object({
  email: string().email('Please enter a valid email address.').required('Please enter a valid email address.'),
}).required();
type InviteFormData = InferType<typeof schemaInviteForm>

const Page = () => {
  const { 
    register: registerInviteForm,
    handleSubmit: handleSubmitInviteForm,
    formState: { errors: errorsInviteForm, isSubmitting: isInviteFormSubmitting },
    reset: resetInviteForm } = useForm<InviteFormData>({resolver: yupResolver(schemaInviteForm), defaultValues: { email: '' } });

  const { user } = useContext(UserContext);

  const router = useRouter();
  const tournamentId = parseInt(router.query.id as string, 10)

  const { tournament, isLoading: isTournamentLoading } = useTournament(tournamentId);
  const { tournamentPlayers, isLoading: isPlayersLoading, mutate: mutateTournamentPlayers } = useTournamentPlayers(tournamentId);
  const { pendingUsers, isLoading: isPendingUsersLoading, mutate: mutateTournamentPendingUsers } = useTournamentPendingUsers(tournamentId);
  const { teams, isLoading: isTeamsLoading, mutate: mutateTeams } = useTeams(tournamentId);
  const { acceptUser } = useTournamentPlayersManagement(tournamentId);
  const [inviteUserVisible, setInviteUserVisible] = useState(false);
  const { inviteUser, startTournament } = useTournamentManagement();
  const { profile: manager } = useProfile(tournament?.managerId as number);
  const { mostScoringPlayer } = useMostScoringPlayer(tournamentId, tournament ? hasEnded(tournament?.details.state): false);
  const { mostScoringTeam } = useMostScoringTeam(tournamentId, tournament ? hasEnded(tournament?.details.state): false);
  const [isStartLoading, setIsStartLoading] = useState(false);
  const { deleteTeam } = useTeamManagement();
  const { exitTournament } = useTournamentRequests();

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

  const closeInviteUser = () => {
    setInviteUserVisible(false);
    resetInviteForm();
  }

  const onSubmitInviteUser = async (data: InviteFormData) => {
    console.log(data);

    const result = await inviteUser(tournament?.details?.code as string, data.email);
    console.log(result);

    if (result.status) {
      toast.success('Request sent successfully!');
      closeInviteUser();
    } else {
      toast.error(`Request failed.`);
    }
  }

  const startTournamentHandler = async () => {
    console.log(teams);
    if (!(teams.length >= 2 && teams.length % 2 === 0)) {
      toast.error('You can only start a tournament with a minimum of two teams and an even numbers of teams.');
      return;
    }
    setIsStartLoading(true);
    
    // delete players unassociated with any team
    tournamentPlayers.forEach(async p => {
      if (!teams.some(t => t.players.some(pp => pp.id === p.id))) {
        const exitResult = await exitTournament(p.id, tournamentId);
        console.log(exitResult);
      }
    })
    
    const result = await startTournament(tournamentId);
    console.log(result);

    if (result.status) {
      toast.success('Tournament started: let\'s go!');
      router.push(`${router.asPath}/matches`)
    } else {
      toast.error(`Tournament failed to start`);
    }
  }

  const deleteTeamHandler = async (teamId: number) => {
    const result = await deleteTeam(teamId);
    console.log(result);

    if (result.status) {
      toast.success('Team was deleted successfully!');
    } else {
      toast.error(`Request failed to delete team.`);
    }

    mutateTeams(teams.filter(t => t.id !== teamId));
  }

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(tournament?.details.code as string);
    toast.success('Invitation code copied to clipboard')
  }

  console.log(mostScoringPlayer)

  return isTournamentLoading ? <LoadingSpinner /> : !tournament?.details ? null : (
    <>
      <Title>Tournament Information</Title>
      <section>
        <TournamentLi name={tournament.title} sport={alternativeSportsNames.get(tournament.details.sport) as Sport}>
          <div className='flex items-center gap-1'>
            <StatusLabel status={tournament.details.state as Status} >
              {tournament.details.state}
            </StatusLabel>
            <Link className='rounded-full' href={`${router.asPath}/matches`}>
              {!isPending(tournament.details.state) && <OutlinedButton icon={BsArrowRight}>Go to matches</OutlinedButton>}
            </Link>
          </div>
        </TournamentLi>
      </section>
      <section>
        <Subtitle>Tournament Details</Subtitle>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-center'>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <BsCheckCircle />
              <p className='font-semibold'>Availability</p>
            </div>
            {tournament.details.availability === 'PUBLIC' ? 'Public' : 'Private'}
          </div>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <BsClock />
              <p className='font-semibold'>Match duration</p>
            </div>
            {tournament.details.matchDuration} minutes
          </div>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <BsPinMap />
              <p className='font-semibold'>Number of playgrounds</p>
            </div>
            {tournament.details.playgrounds}
          </div>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <BsPerson className='text-xl' />
              <p className='font-semibold'>Team size</p>
            </div>
            {tournament.details.teamSize}
          </div>
          <div>
            <div className='flex justify-center items-center gap-2'>
              <BsPersonGear className='text-xl' />
              <p className='font-semibold'>Manager</p>
            </div>
            {`${manager?.firstName} ${manager?.lastName}`}
          </div>
          {userIsManager(user.id, tournament) && tournament.details.state === Status.Pending &&
          <div>
            <div className='flex justify-center items-center gap-2'>
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
          {userIsManager(user.id, tournament) && isPending(tournament.details.state) && <Link className='rounded-full' href={`${router.asPath}/teams/create`}><OutlinedButton icon={BsPlusLg}>Create team</OutlinedButton></Link>}
        </div>
        { isTeamsLoading ? <LoadingSpinner /> :
        !teams.length ? <p>There aren&apos;t any teams yet.</p> :
        <ul>
          {teams.map(team => {
            const sport = alternativeSportsNames.get(tournament.details.sport);
            return (
              <TeamLi teamId={team.id} tournamentId={tournamentId} key={team.id} name={team.title} sport={sport as Sport}>
                {isPending(tournament.details.state) ?
                  userIsManager(user.id, tournament) && <GradientButton attributes={{onClick: () => deleteTeamHandler(team.id)}} type='red'>Delete</GradientButton> :
                  <GradientButton attributes={{disabled: true}} type='light' grayscale={team.suspended}>
                    {team.suspended ? 'Out' : hasEnded(tournament.details.state) ? 'Winner' : 'Standing'}
                  </GradientButton>}
              </TeamLi>
            )})}
        </ul>}
      </section>
      {userIsManager(user.id, tournament) && isPending(tournament.details.state) &&
        <section>
          <Subtitle>Pending Requests</Subtitle>
          { isPendingUsersLoading ? <LoadingSpinner /> :
          !pendingUsers.length ? <p>There aren&apos;t any pending requests.</p> :
          <ul className='flex flex-col gap-1'>
            {pendingUsers.map(pendingUser => (
              <UserLi id={pendingUser.id} key={pendingUser.id} name={`${pendingUser.firstName} ${pendingUser.lastName}`}>
                <GradientButton type='light' attributes={{onClick: () => acceptUserHandler(pendingUser)}}>Accept</GradientButton>
              </UserLi>))}
          </ul>}
        </section>}
        <section>
          <div className='flex justify-between items-center'>
            <Subtitle>Players</Subtitle>
            {/* {userIsManager(user.id, tournament) && isPending(tournament.details.state) && <OutlinedButton icon={BsPlusLg} attributes={{onClick: () => setInviteUserVisible(true)}}>Invite</OutlinedButton>} */}
          </div>
          { isPlayersLoading ? <LoadingSpinner /> :
          !tournamentPlayers.length ? <p>There aren&apos;t any players yet.</p> :
          <ul className='grid grid-cols-2 gap-4'>
            {tournamentPlayers.map(player => (
              <UserLi id={player.id} key={player.id} name={`${player.firstName} ${player.lastName}`}>
              </UserLi>))}
          </ul>}
        </section>
        {userIsManager(user.id, tournament) && isPending(tournament.details.state) &&
        <div className='self-center'>
          {isStartLoading ? <LoadingSpinner /> :
          <GradientButton type='light' attributes={{onClick: startTournamentHandler}}>
            Start
          </GradientButton>}
        </div>}
        {hasEnded(tournament.details.state) && mostScoringPlayer && mostScoringTeam &&
         <section>
          <Subtitle>Statistics</Subtitle>
          <ListItem icon={BsStar} title={mostScoringTeam.object.title} subtitle='Most Scoring Team'>
            <p className='text-tournamento-400 text-3xl'>{mostScoringTeam.score}</p>
          </ListItem>
          <ListItem icon={BsStar} title={`${mostScoringPlayer.object.firstName} ${mostScoringPlayer.object.lastName}`} subtitle='Most Scoring Player'>
            <p className='text-tournamento-400 text-3xl'>{mostScoringPlayer.score}</p>
          </ListItem>
        </section>}
      <Modal title='Invite User' isOpen={inviteUserVisible} close={closeInviteUser}>
        <Form attributes={{onSubmit: handleSubmitInviteForm(onSubmitInviteUser)}}>
          <SquareInput error={errorsInviteForm.email} label='Enter below the email address of the user' attributes={{...registerInviteForm('email')}} />
          <div className='self-center'>
            {isInviteFormSubmitting ? <LoadingSpinner /> : <GradientButton type='light' attributes={{type: 'submit'}}>Invite</GradientButton>}
          </div>
        </Form>
      </Modal>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;