import useSWR from "swr";
import { getRequest, postRequest } from "./services";
import { Tournament } from "@/utils/types";

const baseUrl = 'http://localhost:5000';

export const usePublicTournaments = () => {
  const url = `${baseUrl}/tournaments/getAll`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    publicTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useUserTournaments = (userId: number) => {
  const url = `${baseUrl}/player/allTournaments/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    userTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournament = (tournamentId: number) => {
  const url = `${baseUrl}/player/allTournaments/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    userTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournamentRequests = (userId: number) => ({
  joinTournament: (tournamentId: number) => postRequest(`${baseUrl}/player/joinTournament/${userId}/${tournamentId}`),
  exitTournament: (tournamentId: number) => postRequest(`${baseUrl}/player/exitTournament/${userId}/${tournamentId}`)
})

export const useTournamentManagement = (userId: number) => ({
  createTournament: (tournament: {[key: string]: any}) => postRequest(`${baseUrl}/tournaments/create/${userId}`, tournament),
})