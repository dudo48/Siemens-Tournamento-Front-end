import CircledIconButton from "@/components/buttons/circled-icon-button";
import GradientButton from "@/components/buttons/gradient-button";
import MatchLi from "@/components/list items/match-li";
import UserLi from "@/components/list items/user-li";
import LoadingSpinner from "@/components/misc/loading-spinner";
import Title from "@/components/misc/title";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useMatch, useMatchManagement } from "@/services/match-service";
import { useTournament } from "@/services/tournament-service";
import { hasEnded, hasStarted, userIsManager } from "@/utils/functions";
import { Match, Team } from "@/utils/types";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect, useState } from "react";
import { BsDashLg, BsPlusLg } from "react-icons/bs";
import { toast } from "react-toastify";

const Page = () => {
  const [playersScore, setPlayersScore] = useState<{[key: number]: number}>({});
  const [teamScores, setTeamScores] = useState<{[key: number]: number}>({});

  const { user } = useContext(UserContext);
  const router = useRouter();
  const tournamentId = parseInt(router.query.id as string, 10)
  const { tournament } = useTournament(tournamentId);
  const matchId = parseInt(router.query.matchId as string, 10)
  const { match } = useMatch(tournamentId, matchId);
  const { endMatch } = useMatchManagement();
  const [isEndLoading, setIsEndLoading] = useState(false);

  useEffect(() => {
    if (match && hasEnded(match?.state)) {
      // initialize players scores
      let score: {[key: number]: number} = {}
      match.score.scoreSheet.forEach(s => score[s.scorer as number] = s.points);
      setPlayersScore(score);

      // initialize teams scores
      score = {}
      score[match.teamOne.id] = match.teamOne.id === (match.score.winner as Team).id ? match.score.winnerScore : match.score.loserScore;
      score[match.teamTwo.id] = match.teamTwo.id === (match.score.winner as Team).id ? match.score.winnerScore : match.score.loserScore;
      match.score.scoreSheet.forEach(s => score[s.scorer as number] = s.points);
      setTeamScores(score);

      console.log(match)
    }
  }, [match])

  const editPlayerScore = (id: number, points: number) => {
    const newScore = {...playersScore};
    newScore[id] = newScore[id] === undefined ? 1 : newScore[id] + points;
    setPlayersScore(newScore)
  }

  const editTeamScore = (id: number, points: number) => {
    const newScore = {...teamScores};
    newScore[id] = newScore[id] === undefined ? 1 : newScore[id] + points;
    setTeamScores(newScore)
  }

  const createScoresData = (match: Match) => {
    const teamOneId = match.teamOne.id;
    const teamTwoId = match.teamTwo.id;

    const winner = { id: teamScores[teamOneId] > teamScores[teamTwoId] ? teamOneId : teamTwoId };
    const loser = { id: teamScores[teamOneId] > teamScores[teamTwoId] ? teamTwoId : teamOneId };
    const playersScoreArray = Object.keys(playersScore).map((val: string) => {
      const id = parseInt(val, 10);
      return [id, playersScore[id]]
    });

    return {
      matchId: matchId,
      winner: winner,
      loser: loser,
      winnerScore: teamScores[winner.id] || 0,
      loserScore: teamScores[loser.id] || 0,
      scoreSheet: playersScoreArray.map(score => ({
        matchId: matchId,
        scoringFor: match.teamOne.players.some(p => p.id === score[0]) ? teamOneId : teamTwoId,
        scoringAgainst: match.teamOne.players.some(p => p.id === score[0]) ? teamTwoId : teamOneId,
        scorer: score[0],
        points: score[1]
      }))
    };
  }

  const endMatchHandler = async () => {
    if (!match) return null;
    setIsEndLoading(true)

    const scores = createScoresData(match)
    const result = await endMatch(tournamentId, matchId, scores);

    if (result.status) {
      toast.info('Match ended!');
      router.push(`/tournaments/${tournamentId}/matches`)
    } else {
      toast.error(`Match failed to end`);
    }

    setIsEndLoading(false);
  }

  return !match ? <LoadingSpinner /> : (
    <>
      <Title>Play Match</Title>
      <section className='flex flex-col gap-2'>
        <MatchLi homeTeam={match.teamOne.title} awayTeam={match.teamTwo.title}>
          <div className='text-4xl'>{teamScores[match.teamOne.id] || 0} - {teamScores[match.teamTwo.id] || 0}</div>
        </MatchLi>
        <div className='self-center'>
          {isEndLoading ?
              <LoadingSpinner /> : tournament && userIsManager(user.id, tournament) && hasStarted(match.state) && 
              <GradientButton type='light' attributes={{onClick: endMatchHandler}}>End match</GradientButton>}
        </div>
        <div className='flex gap-32'>
          <ul className='flex-1'>
            {match.teamOne.players.map(player => (
              <UserLi name={`${player.firstName} ${player.lastName}`} key={player.id}>
                <div className='flex gap-2'>
                  <p>{playersScore[player.id] || 0}</p>
                  {tournament && userIsManager(user.id, tournament) && hasStarted(match.state) && <CircledIconButton icon={BsPlusLg} attributes={{onClick: () => {editPlayerScore(player.id, 1); editTeamScore(match.teamOne.id, 1)}}} />}
                  {tournament && userIsManager(user.id, tournament) && hasStarted(match.state) && <CircledIconButton icon={BsDashLg} attributes={{onClick: () => {editPlayerScore(player.id, -1); editTeamScore(match.teamOne.id, -1)}}} />}
                </div>
              </UserLi>))}
          </ul>
          <ul className='flex-1'>
            {match.teamTwo.players.map(player => (
              <UserLi name={`${player.firstName} ${player.lastName}`} key={player.id}>
                <div className='flex gap-2'>
                  <p>{playersScore[player.id] || 0}</p>
                  {tournament && userIsManager(user.id, tournament) && hasStarted(match.state) && <CircledIconButton icon={BsPlusLg} attributes={{onClick: () => {editPlayerScore(player.id, 1); editTeamScore(match.teamTwo.id, 1)}}} />}
                  {tournament && userIsManager(user.id, tournament) && hasStarted(match.state) && <CircledIconButton icon={BsDashLg} attributes={{onClick: () => {editPlayerScore(player.id, -1); editTeamScore(match.teamTwo.id, -1)}}} />}
                </div>
              </UserLi>))}
          </ul>
        </div>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;