import GradientButton from "@/components/buttons/gradient-button";
import OutlinedButton from "@/components/buttons/outlined-button";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import TournamentLi from "@/components/list items/tournament-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Modal from "@/components/misc/modal";
import StatusLabel from "@/components/misc/state-label";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useUserRequestedTournaments, useUserTournaments } from "@/services/user-service";
import { usePublicTournaments, useTournamentRequests } from "@/services/tournament-service";
import { alternativeSportsNames } from "@/utils/mappings";
import { Sport, Tournament, Status } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { ReactNode, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";
import { InferType, object, string } from "yup";
import { isPending, userIsManager } from "@/utils/functions";

const schema = object({
  code: string().required('Please enter the join code.'),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const { user } = useContext(UserContext);
  const [joinTournamentVisible, setJoinTournamentVisible] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({resolver: yupResolver(schema) });
  const { joinTournamentById, joinTournamentByCode, exitTournament } = useTournamentRequests(user.id);
  const { publicTournaments, isLoading: publicTournamentsLoading } = usePublicTournaments();
  const { userTournaments, isLoading: userTournamentsLoading, mutate: mutateUserTournaments } = useUserTournaments(user.id);
  const { userRequestedTournaments, mutate: mutateUserRequestedTournaments } = useUserRequestedTournaments(user.id);
  
  // filter out the tournaments the user is already in and non pending tournaments
  const availableTournaments = publicTournaments.filter(t => !userTournaments.some(ut => ut.id === t.id)).filter(t => isPending(t.details.state));
  
  const closeJoinTournament = () => {
    setJoinTournamentVisible(false);
    reset();
  }

  const joinByCode = async (data: FormData) => {
    console.log(data);

    const result = await joinTournamentByCode(data.code);
    console.log(result, 'yes');

    if (result.status) {
      toast.success('Join request was sent successfully!');
    } else {
      toast.error(`Join request failed: Wrong code.`);
    }

    closeJoinTournament()
  }

  const joinById = async (tournament: Tournament) => {
    const result = await joinTournamentById(tournament.id);
    console.log(result);

    if (result.status) {
      toast.success('Join request was sent successfully!');
    } else {
      toast.error(`Join request failed.`);
    }

    mutateUserRequestedTournaments(userRequestedTournaments.concat(tournament))
  }

  const exitTournamentHandler = async (tournament: Tournament) => {
    const result = await exitTournament(tournament.id);
    console.log(result);

    if (result.status) {
      toast.success('Tournament exited successfully!');
    } else {
      toast.error(`Exit request failed.`);
    }

    mutateUserTournaments(userTournaments.filter(t => t.id !== tournament.id))
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Tournaments</Title>
        <GradientButton type='light' attributes={{onClick: () => setJoinTournamentVisible(true)}}>Join with code</GradientButton>
      </div>
      <section>
        <Link href={'/tournaments/create'} className='rounded-full'>
          <OutlinedButton icon={BsPlusLg}>
            Create Tournament
          </OutlinedButton>
        </Link>
      </section>
      <section>
        <Subtitle>My Tournaments</Subtitle>
        { userTournamentsLoading ? <LoadingSpinner /> :
        !userTournaments.length ? <p>You aren&apos;t in any tournaments at the moment.</p> :
        <ul>
          {[...userTournaments].reverse().map(tournament => {
            const sport = alternativeSportsNames.get(tournament.details.sport);
            const status = tournament.details.state;
            return (
              <TournamentLi key={tournament.id} id={tournament.id} name={tournament.title} sport={sport as Sport}>
                <div className='flex items-center gap-1'>
                  <StatusLabel status={status as Status} >
                    {status}
                  </StatusLabel>
                  {!userIsManager(user.id, tournament) && isPending(tournament.details.state) &&
                    <GradientButton type='red' attributes={{onClick: () => exitTournamentHandler(tournament)}}>
                      Leave
                    </GradientButton>}
                </div>
              </TournamentLi>
            )})}
        </ul>}
      </section>
      <section>
        <Subtitle>Available Public Tournaments ({publicTournamentsLoading ? '?' : availableTournaments.length}):</Subtitle>
        { publicTournamentsLoading ? <LoadingSpinner /> :
        !availableTournaments.length ? <p>There aren&apos;t any tournaments available at the moment.</p> :
        <ul>
          {[...availableTournaments].reverse().map(tournament => {
            const sport = alternativeSportsNames.get(tournament.details.sport);
            const joinRequestSent = userRequestedTournaments.some(t => t.id === tournament.id);
            return (
              <TournamentLi key={tournament.id} id={tournament.id} name={tournament.title} sport={sport as Sport}>
                <GradientButton type={joinRequestSent ? 'orange' : 'light'} attributes={{onClick: () => joinById(tournament), disabled: joinRequestSent}}>
                  {joinRequestSent ? 'Request sent' : 'Join'}
                </GradientButton>
              </TournamentLi>
            )})}
        </ul>}
      </section>
      <Modal title='Join Tournament with Code' isOpen={joinTournamentVisible} close={closeJoinTournament}>
        <Form attributes={{onSubmit: handleSubmit(joinByCode)}}>
          <SquareInput error={errors.code} label='Enter below the join code for the tournament' attributes={{...register('code')}} />
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='light' attributes={{type: 'submit'}}>Join</GradientButton>}
          </div>
        </Form>
      </Modal>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;