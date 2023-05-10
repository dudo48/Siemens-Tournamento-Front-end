import { User } from "@/utils/types";
import useSWR from "swr";
import { getRequest } from "./services";

const baseUrl = 'http://localhost:5000/player';

export const useProfile = (userId: number) => {
  const url = `${baseUrl}/getPofile/${userId}`;
  const { data, mutate, isLoading, error } = useSWR(url, getRequest);
  return {
    profile: data,
    mutate,
    isLoading,
    error
  };
}