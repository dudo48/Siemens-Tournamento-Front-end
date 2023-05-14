import GradientButton from "@/components/buttons/gradient-button";
import OutlinedButton from "@/components/buttons/outlined-button";
import Form from "@/components/forms/form";
import SquareInput from "@/components/forms/square-input";
import UserLi from "@/components/list items/user-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Modal from "@/components/misc/modal";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useTeamManagement, useTeams } from "@/services/team-service";
import { useTournament, useTournamentPlayers } from "@/services/tournament-service";
import { userIsManager } from "@/utils/functions";
import { User } from "@/utils/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsPlusLg, BsX } from "react-icons/bs";
import { toast } from "react-toastify";
import { InferType, array, object, string } from "yup";

const schema = object({
  name: string().min(4, 'Please enter a name of at least 4 characters.').required('Please enter a tournament name of at least 4 characters.'),
  players: array().when('$teamSize', ([teamSize], s) => s.length(teamSize, `Please choose ${teamSize} player(s).`)).required(),
}).required();
type FormData = InferType<typeof schema>

const Page = () => {
  const router = useRouter();
  const [allowPage, setAllowPage] = useState(false);
  const { user } = useContext(UserContext);
  const tournamentId = parseInt(router.query.id as string, 10);
  const { tournamentPlayers, isLoading: isPlayersLoading } = useTournamentPlayers(tournamentId);
  const { addPlayerToTeam, createTeam } = useTeamManagement();
  const { tournament } = useTournament(tournamentId);
  const { teams } = useTeams(tournamentId);
  
  const { register, handleSubmit, setValue, watch, resetField, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: yupResolver(schema),
    context: {teamSize: tournament?.details.teamSize},
    defaultValues: { name: '', players: [] }
  });

  useEffect(() => {
    register('players');
    setValue('players', [])
  }, [register, setValue]);

  useEffect(() => {
    if (!user || !tournament) return

    if (userIsManager(user.id, tournament)) {
      setAllowPage(true);
      return
    }
    router.push(`/tournaments/${tournamentId}`);
  }, [router, tournament, tournamentId, user]);

  console.log(errors)
  
  const [selectPlayerVisible, setSelectPlayerVisible] = useState(false);

  // filter out players in other teams, then filter out already selected players
  let availablePlayers = tournamentPlayers.filter(p => !teams.some(t => t.players.map(pp => pp.id).some(pId => pId === p.id)));
  availablePlayers = availablePlayers.filter(p => !watch('players').some(pp => pp.id === p.id));

  const closeSelectPlayer = () => {
    setSelectPlayerVisible(false);
  }
    
  const addPlayer = (player: User) => {
    closeSelectPlayer();
    setValue('players', watch('players').concat(player));
  }

  const createTeamHandler = async (data: FormData) => {
    console.log(data);
    
    const result = await createTeam(tournamentId, data.name);
    console.log(result);
    
    if (result.status) {
      data.players.forEach(async p => await addPlayerToTeam(result.data.id, p.id));
      toast.success('Team was created successfully!');
      router.push(`/tournaments/${tournamentId}`);
    } else {
      toast.error(`Team creation failed.`);
    }
  }

  return !allowPage ? <LoadingSpinner /> : (
    <>
      <Title>Create a Team</Title>
      <section className='flex flex-col'>
        <Form attributes={{onSubmit: handleSubmit(createTeamHandler)}}>
          <SquareInput error={errors.name} label='Team name' attributes={{...register('name')}}/>
          <div>
            <div className='flex justify-between items-center'>
              <div>
                <OutlinedButton icon={BsPlusLg} attributes={{type: 'button', onClick: () => setSelectPlayerVisible(true)}}>
                  Add player
                </OutlinedButton>
                <p>{tournament && !!(tournament?.details?.teamSize - watch('players').length) && `(${tournament?.details.teamSize - watch('players').length} remaining)`}</p>
              </div>
              {!!watch('players').length && <GradientButton type='red' attributes={{onClick: () => resetField('players'), type: 'button'}}>Clear selection</GradientButton>}
            </div>
          </div>
            <ul className='flex flex-col gap-1'>
              {watch('players').map((player: User) => (
                <UserLi key={player.id} name={`${player.firstName} ${player.lastName}`}>
                  <GradientButton type='red' attributes={{
                    onClick: () => setValue('players', watch('players').filter(u => u.id !== player.id)),
                    type: 'button'
                    }}
                    icon={BsX}>
                  </GradientButton>
                </UserLi>
              ))}
            </ul>
          <div className='self-center'>
            {isSubmitting ? <LoadingSpinner /> : <GradientButton type='light' attributes={{type: 'submit'}}>Create</GradientButton>}
          </div>
        </Form>
      </section>
      <Modal title='Add Player' isOpen={selectPlayerVisible} close={closeSelectPlayer}>
      { isPlayersLoading ? <LoadingSpinner /> :
        !availablePlayers.length ? <p>There are no available players.</p> :
        <ul className='flex flex-col gap-1'>
          {availablePlayers.map(player => (
            <UserLi key={player.id} name={`${player.firstName} ${player.lastName}`}>
              <GradientButton type='light' attributes={{onClick: () => addPlayer(player)}}>Add</GradientButton>
            </UserLi>))}
        </ul>}
      </Modal>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;