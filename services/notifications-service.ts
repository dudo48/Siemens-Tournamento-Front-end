import useSWR from "swr";
import { deleteRequest, getRequest, putRequest } from "./services";
import { Notification } from "@/utils/types";

const baseUrl = 'http://localhost:5000/notifications';

export const useNotifications = (id: number) => {
  const url = `${baseUrl}/getAll/${id}`;
  const { data, mutate, isLoading, error } = useSWR<Notification[]>(url, getRequest);
  return {
    notifications: data || [],
    mutate,
    isLoading,
    error
  };
}

export const useNotificationsRead = () => ({
  markAsRead: (notificationId: number) => putRequest(`${baseUrl}/markAsRead/${notificationId}`),
  markAllAsRead: (userId: number) => putRequest(`${baseUrl}/markAll/${userId}`)
});

export const useNotificationsModify = () => ({
  deleteNotification: (notificationId: number) => deleteRequest(`${baseUrl}/remove/${notificationId}`),
  deleteAllNotifications: (userId: number) => deleteRequest(`${baseUrl}/removeAll/${userId}`)
});