import { Team } from "@/utils/types";
import useSWR from "swr";
import { deleteRequest, getRequest, postRequest } from "./services";

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

export const useTeam = (teamId: number) => {
  const url = `${baseUrl}/getById/${teamId}`;
  const { data, mutate, isLoading, error } = useSWR<Team>(teamId ? url : null, getRequest);
  return {
    team: data,
    mutate,
    isLoading,
    error
  };
}

export const useTeamManagement = () => ({
  createTeam: (tournamentId: number, teamName: string) => postRequest(`${baseUrl}/create?tournamentId=${tournamentId}`, { title: teamName }),
  deleteTeam: (teamId: number) => deleteRequest(`${baseUrl}/removeTeam/${teamId}`),
  addPlayerToTeam: (teamId: number, userId: number) => postRequest(`${baseUrl}/addPlayer/${teamId}/${userId}`)
})