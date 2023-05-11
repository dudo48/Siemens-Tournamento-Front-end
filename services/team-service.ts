import useSWR from "swr";
import { getRequest, postRequest } from "./services";
import { Tournament, User } from "@/utils/types";

const baseUrl = 'http://localhost:5000/teams';

export const useTeams = (tournamentId: number) => {
  const url = `${baseUrl}/teams?tournamentId=${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR(url, getRequest);
  return {
    teams: data || [],
    mutate,
    isLoading,
    error
  };
}