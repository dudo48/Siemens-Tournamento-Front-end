import useSWR from "swr";
import { deleteRequest, getRequest, postRequest, putRequest } from "./services";
import { Team, Tournament, User } from "@/utils/types";
import { use } from "react";

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
  const { data, mutate, isLoading, error } = useSWR<Tournament>(tournamentId ? url : null, getRequest);
  return {
    tournament: data,
    mutate,
    isLoading,
    error
  };
}

export const useTournamentPlayers = (tournamentId: number) => {
  const url = `${baseUrl}/manage/players/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(tournamentId ? url : null, getRequest);
  return {
    tournamentPlayers: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournamentPendingUsers = (tournamentId: number) => {
  const url = `${baseUrl}/manage/pendingPlayers/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(tournamentId ? url : null, getRequest);
  return {
    pendingUsers: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useTournamentRequests = () => ({
  joinTournamentById: (userId: number, tournamentId: number) => postRequest(`${baseUrl}/player/joinTournament/${userId}/${tournamentId}`),
  joinTournamentByCode: (userId: number, tournamentCode: string) => postRequest(`${baseUrl}/player/joinByCode/${userId}/${tournamentCode}`),
  exitTournament: (userId: number, tournamentId: number) => deleteRequest(`${baseUrl}/player/exitTournament/${userId}/${tournamentId}`)
})

export const useTournamentManagement = () => ({
  createTournament: (userId: number, tournament: {[key: string]: any}) => postRequest(`${baseUrl}/tournaments/create/${userId}`, tournament),
  inviteUser: (tournamentCode: string, email: string) => postRequest(`${baseUrl}/manage/invite/${tournamentCode}/${email}`),
  startTournament: (tournamentId: number) => postRequest(`${baseUrl}/manage/launch/${tournamentId}`),
  endTournament: (tournamentId: number) => putRequest(`${baseUrl}/tournaments/end/${tournamentId}`),
})

export const useTournamentPlayersManagement = (tournamentId: number) => ({
  acceptUser: (userId: number) => putRequest(`${baseUrl}/manage/accept/${tournamentId}/${userId}`),
})

export const useMostScoringTeam = (tournamentId: number, shouldFetch: boolean) => {
  const url = `${baseUrl}/tourStats/mostScoringTeam/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<{object: Team, score: number}>(tournamentId && shouldFetch ? url : null, getRequest);
  return {
    mostScoringTeam: data,
    mutate,
    isLoading,
    error
  };
}

export const useMostScoringPlayer = (tournamentId: number, shouldFetch: boolean) => {
  const url = `${baseUrl}/tourStats/mostScoringPlayer/${tournamentId}`;
  const { data, mutate, isLoading, error } = useSWR<{object: User, score: number}>(tournamentId && shouldFetch ? url : null, getRequest);
  return {
    mostScoringPlayer: data,
    mutate,
    isLoading,
    error
  };
}