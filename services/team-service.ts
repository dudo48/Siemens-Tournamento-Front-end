import { Team } from "@/utils/types";
import useSWR from "swr";
import { getRequest, postRequest } from "./services";

const baseUrl = 'http://localhost:5000/teams';

export const useTeams = (tournamentId: number) => {
  const url = `${baseUrl}/getAll?tournamentId=${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<Team[]>(tournamentId ? url : null, getRequest);
  return {
    teams: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTeamManagement = () => ({
  createTeam: (tournamentId: number, teamName: string) => postRequest(`${baseUrl}/create?tournamentId=${tournamentId}`, { title: teamName }),
  addPlayerToTeam: (teamId: number, userId: number) => postRequest(`${baseUrl}/addPlayer/${teamId}/${userId}`)
})