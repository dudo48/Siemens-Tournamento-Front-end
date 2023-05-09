import useSWR from "swr";
import { deleteRequest, getRequest, postRequest } from "./services";
import { User } from "@/utils/types";

const baseUrl = 'http://localhost:5000/connections';

export const useConnectionsModify = (fromId: number) => ({
  addConnection: (email: string) => postRequest(`${baseUrl}/postRequest/${fromId}/${email}`),
  deleteConnection: (id: number) => deleteRequest(`${baseUrl}/deleteConnection/${fromId}/${id}`)
});

export const useRequestsResponse = (toId: number) => ({
    acceptRequest: (id: number) => postRequest(`${baseUrl}/acceptRequest/${id}/${toId}`),
    declineRequest: (id: number) => deleteRequest(`${baseUrl}/deleteRequest/${id}/${toId}`)
});

export const useSentRequests = (id: number) => {
  const url = `${baseUrl}/getAllSent/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    sentRequests: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useIncomingRequests = (id: number) => {
  const url = `${baseUrl}/getAllIncoming/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest, {fallbackData: []});
  return {
    incomingRequests: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useConnections = (id: number) => {
  const url = `${baseUrl}/getAllConnections/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    connections: data || [],
    mutate,
    isLoading,
    error
  };
}