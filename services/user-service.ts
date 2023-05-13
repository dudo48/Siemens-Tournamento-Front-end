import { Tournament, User } from "@/utils/types";
import useSWR from "swr";
import { getRequest, patchRequest } from "./services";

const baseUrl = 'http://localhost:5000/player';

export const useProfile = (userId: number) => {
  const url = `${baseUrl}/getProfile/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<User>(userId ? url : null, getRequest);
  return {
    profile: data,
    mutate,
    isLoading,
    error
  };
}

export const useProfileManagement = () => ({
  updateProfile: (userId: number, data: {[key: string]: string}) => patchRequest(`${baseUrl}/updateProfile/${userId}`, data),
})

export const useStatistics = (userId: number) => {
  const url = `${baseUrl}/getStatistics/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<{[key: string]: number}>(userId ? url : null, getRequest);
  return {
    statistics: data,
    mutate,
    isLoading,
    error
  };
}

export const useUserTournaments = (userId: number) => {
  const url = `${baseUrl}/allTournaments/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    userTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useUserRequestedTournaments = (userId: number) => {
  const url = `${baseUrl}/allPendingRequested/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    userRequestedTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useUserTournamentInviations = (userId: number) => {
  const url = `${baseUrl}/allInvitations/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<Tournament[]>(url, getRequest);
  return {
    userRequestedTournaments: data || [],
    mutate,
    isLoading,
    error
  };
}