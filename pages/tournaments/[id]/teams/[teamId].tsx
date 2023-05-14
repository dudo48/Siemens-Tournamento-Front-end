import TeamLi from "@/components/list items/team-li";
import UserLi from "@/components/list items/user-li";
import Subtitle from "@/components/misc/subtitle";
import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { useTeam } from "@/services/team-service";
import { useTournament } from "@/services/tournament-service";
import { alternativeSportsNames } from "@/utils/mappings";
import { Sport } from "@/utils/types";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const Page = () => {
  const router = useRouter();
  const tournamentId = parseInt(router.query.id as string, 10)
  const teamId = parseInt(router.query.teamId as string, 10)
  const { team } = useTeam(teamId);
  const { tournament } = useTournament(tournamentId);

  return (
    <>
      <Title>Team Information</Title>
      <section>
        <TeamLi name={team?.title as string} sport={alternativeSportsNames.get(tournament?.details.sport as string) as Sport} />
      </section>
      <section>
        <div className='flex justify-between items-center'>
          <Subtitle>Players</Subtitle>
        </div>
        <ul>
          {team?.players.map(p => <UserLi key={p.id} name={`${p.firstName} ${p.lastName}`} id={p.id} />)}
        </ul>
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;