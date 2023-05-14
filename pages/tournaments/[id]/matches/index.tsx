import GradientButton from "@/components/buttons/gradient-button";
import OutlinedButton from "@/components/buttons/outlined-button";
import MatchLi from "@/components/list items/match-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import StatusLabel from "@/components/misc/state-label";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useMatchManagement, useMatches } from "@/services/match-service";
import { useTournament, useTournamentManagement } from "@/services/tournament-service";
import { hasEnded, hasStarted, userIsManager } from "@/utils/functions";
import { Match, Status, Team } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useContext, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";

const Page = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const tournamentId = parseInt(router.query.id as string, 10)
  const { tournament } = useTournament(tournamentId);
  const [isEndLoading, setEndLoading] = useState(false);

  const { matches, isLoading: isMatchLoading, mutate: mutateMatches } = useMatches(tournamentId);
  const { startMatch } = useMatchManagement();
  const { endTournament } = useTournamentManagement();

  // get unique array of rounds
  let rounds = matches.map(m => m.round)
  rounds = rounds.filter((r, i) => rounds.indexOf(r) === i).sort((a, b) => a - b);

  console.log(matches);

  const playMatch = async (match: Match) => {
    const result = await startMatch(tournamentId, match.id);
    console.log(result);

    if (result.status) {
      router.push(`${router.asPath}/${match.id}`)
    } else {
      toast.error(`Match failed to start`);
    }
  }

  const getMatchIndicator = (match: Match) => {
    if (!tournament) return <LoadingSpinner />;
    if (userIsManager(user.id, tournament) && match.state === Status.Pending) {
      return (
        <GradientButton type='light' attributes={{onClick: () => playMatch(match)}}>
          Play
        </GradientButton>
      )
    } else if (match.state === Status.Ended) {
      const teamOneScore = match.teamOne.id === (match.score.winner as Team).id ? match.score.winnerScore : match.score.loserScore
      const teamTwoScore = match.teamTwo.id === (match.score.winner as Team).id ? match.score.winnerScore : match.score.loserScore
      return (
        <Link className='hover:underline' href={`${router.asPath}/${match.id}`}>
          {teamOneScore} - {teamTwoScore}
        </Link>
      )
    }
    return (
      <Link className='hover:underline' href={`${router.asPath}/${match.id}`}>
        {match.state}
      </Link>
    )
  }

  const allMatchesHaveEnded = () => {
    return matches.every(m => hasEnded(m.state))
  }

  const nextRoundHandler = async () => {
    setEndLoading(true);
    const result = await endTournament(tournamentId);
    console.log(result);

    if (result.status) {
      router.push(`/tournaments/${tournamentId}`);
      toast.info('Tournament has ended.');
    } else {
      toast.error('Tournament failed to end.')
    }

    setEndLoading(false);
  }

  return !tournament ? <LoadingSpinner /> : (
    <>
      <div className='flex justify-between items-center'>
        <Title>Matches</Title>
        {userIsManager(user.id, tournament) && allMatchesHaveEnded() && hasStarted(tournament.details.state) &&
        (isEndLoading ? <LoadingSpinner /> :
         <OutlinedButton attributes={{onClick: nextRoundHandler}} icon={BsArrowRight}>
            End Tournament
          </OutlinedButton>)}
      </div>
      {rounds.map((round: number) =>
        <section key={round}>
          <Subtitle>Round {round}</Subtitle>
          {isMatchLoading ? <LoadingSpinner /> : 
          !matches.length ? <p>There aren&apos;t any matches.</p> :
          <ul className='flex flex-col gap-1'>
            {matches.filter(match => match.round === round).sort((a, b) => a.id - b.id).map(match => (
              <MatchLi key={match.id} homeTeam={match.teamOne.title} awayTeam={match.teamTwo.title}>
                {getMatchIndicator(match)}
              </MatchLi>
            ))}
          </ul>}
        </section>)}
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;