import { Tournament, User, UserProfile } from "@/utils/types";
import useSWR from "swr";
import { getRequest } from "./services";

const baseUrl = 'http://localhost:5000/player';

export const useProfile = (userId: number) => {
  const url = `${baseUrl}/getProfile/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<UserProfile>(url, getRequest);
  return {
    profile: data,
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