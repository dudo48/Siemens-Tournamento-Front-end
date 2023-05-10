import useSWR from "swr";
import { deleteRequest, getRequest, postRequest } from "./services";
import { User } from "@/utils/types";

const baseUrl = 'http://localhost:5000/connections';

export const useConnectionsModify = (fromId: number) => ({
  addConnection: (email: string) => postRequest(`${baseUrl}/postRequest/${fromId}/${email}`),
  deleteConnection: (toId: number) => deleteRequest(`${baseUrl}/deleteConnection/${fromId}/${toId}`)
});

export const useRequestsResponse = (toId: number) => ({
    acceptRequest: (fromId: number) => postRequest(`${baseUrl}/acceptRequest/${fromId}/${toId}`),
    declineRequest: (fromId: number) => deleteRequest(`${baseUrl}/deleteRequest/${fromId}/${toId}`)
});

export const useSentRequests = (userId: number) => {
  const url = `${baseUrl}/getAllSent/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    sentRequests: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useIncomingRequests = (userId: number) => {
  const url = `${baseUrl}/getAllIncoming/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    incomingRequests: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useConnections = (userId: number) => {
  const url = `${baseUrl}/getAllConnections/${userId}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getRequest);
  return {
    connections: data || [],
    mutate,
    isLoading,
    error
  };
}