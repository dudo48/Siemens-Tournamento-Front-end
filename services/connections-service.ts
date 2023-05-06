import useSWR from "swr";
import { deleteService, getService, postService } from "./services";
import { User } from "@/utils/types";

const baseUrl = 'http://localhost:5000/connections';

export const useConnectionsModify = (fromId: number) => ({
  addConnection: (email: string) => postService(`${baseUrl}/postRequest/${fromId}/${email}`),
  deleteConnection: (id: number) => deleteService(`${baseUrl}/deleteConnection/${fromId}/${id}`)
});

export const useRequestsResponse = (toId: number) => ({
    acceptRequest: (id: number) => postService(`${baseUrl}/acceptRequest/${id}/${toId}`),
    declineRequest: (id: number) => deleteService(`${baseUrl}/deleteRequest/${id}/${toId}`)
});

export const useSentRequests = (id: number) => {
  const url = `${baseUrl}/getAllSent/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getService);
  return {
    sentRequests: data,
    mutate,
    isLoading,
    error
  };
}

export const useIncomingRequests = (id: number) => {
  const url = `${baseUrl}/getAllIncoming/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getService);
  return {
    incomingRequests: data,
    mutate,
    isLoading,
    error
  };
}

export const useConnections = (id: number) => {
  const url = `${baseUrl}/getAllConnections/${id}`;
  const { data, mutate, isLoading, error } = useSWR<User[]>(url, getService);
  return {
    connections: data,
    mutate,
    isLoading,
    error
  };
}