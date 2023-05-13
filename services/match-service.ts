import { Match, Team } from "@/utils/types";
import useSWR from "swr";
import { getRequest, postRequest } from "./services";

const baseUrl = 'http://localhost:5000/match';

export const useMatches = (tournamentId: number) => {
  const url = `${baseUrl}/getAll/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<Match[]>(tournamentId ? url : null, getRequest);
  return {
    matches: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useMatch = (tournamentId: number, matchId: number) => {
  const url = `${baseUrl}/getMatchById/${tournamentId}/${matchId}`;
  const { data, mutate, isLoading, error } = useSWR<Match>(tournamentId && matchId ? url : null, getRequest);
  return {
    match: data,
    mutate,
    isLoading,
    error
  };
}

export const useMatchManagement = () => ({
  startMatch: (tournamentId: number, matchId: number) => postRequest(`${baseUrl}/start/${tournamentId}/${matchId}`),
  endMatch: (tournamentId: number, matchId: number, scores: {[key: string]: any}) => postRequest(`${baseUrl}/end/${tournamentId}/${matchId}`, scores),
})