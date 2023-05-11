import useSWR from "swr";
import { deleteRequest, getRequest, postRequest, putRequest } from "./services";
import { Tournament, User } from "@/utils/types";

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

export const useTournament = (tournamentId: number) => {
  const url = `${baseUrl}/tournaments/getById/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament>(url, getRequest);
  return {
    tournament: data || null,
    mutate,
    isLoading,
    error
  };
}

export const useTournamentPlayers= (tournamentId: number) => {
  const url = `${baseUrl}/manage/players/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    tournamentPlayers: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournamentPendingUsers = (tournamentId: number) => {
  const url = `${baseUrl}/manage/pendingPlayers/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    pendingUsers: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournamentRequests = (userId: number) => ({
  joinTournamentById: (tournamentId: number) => postRequest(`${baseUrl}/player/joinTournament/${userId}/${tournamentId}`),
  joinTournamentByCode: (tournamentCode: string) => postRequest(`${baseUrl}/player/joinByCode/${userId}/${tournamentCode}`),
  exitTournament: (tournamentId: number) => deleteRequest(`${baseUrl}/player/exitTournament/${userId}/${tournamentId}`)
})

export const useTournamentManagement = (userId: number) => ({
  createTournament: (tournament: {[key: string]: any}) => postRequest(`${baseUrl}/tournaments/create/${userId}`, tournament),
})

export const useTournamentPlayersManagement = (tournamentId: number) => ({
  acceptUser: (userId: number) => putRequest(`${baseUrl}/manage/accept/${tournamentId}/${userId}`),
})