import Title from "@/components/misc/title";
import PrimaryLayout from "@/layouts/primary-layout";
import { ReactNode, useContext, useEffect, useState } from "react";
import ListItem from "@/components/list items/list-item";
import { Bs1CircleFill, Bs2Circle, Bs2CircleFill, Bs3Circle, Bs3CircleFill, BsEnvelopeCheck, BsEnvelopeOpen, BsFillStarFill, BsHandThumbsDown, BsHeartbreak, BsRecycle, BsStar, BsTrash, BsTrophy } from "react-icons/bs";
import Subtitle from "@/components/misc/subtitle";
import TournamentLi from "@/components/list items/tournament-li";
import GradientButton from "@/components/buttons/gradient-button";
import { Notification, Sport, User } from "@/utils/types";
import UserLi from "@/components/list items/user-li";
import { UserContext } from "@/context/user-context";
import { useIncomingRequests, useRequestsResponse } from "@/services/connections-service";
import { NotificationsContext } from "@/context/notifications-context";
import NotificationLi from "@/components/list items/notification-li";
import { useNotificationsModify, useNotificationsRead } from "@/services/notifications-service";

const Page = () => {
  const { user } = useContext(UserContext);
  const { notifications, mutate } = useContext(NotificationsContext);
  // const { incomingRequests, mutate } = useIncomingRequests(user.id);
  // const { acceptRequest, declineRequest } = useRequestsResponse(user.id);
  const { markAsRead, markAllAsRead } = useNotificationsRead();
  const { deleteNotification, deleteAllNotifications } = useNotificationsModify();

  // const accept = async (id: number) => {
  //   const result = await acceptRequest(id);
  //   console.log(result);
  //   mutate();
  // }

  // const decline = async (id: number) => {
  //   const result = await declineRequest(id);
  //   console.log(result);
  //   mutate();
  // }

  const markAsReadHandler = async (id: number) => {
    const result = await markAsRead(id);
    console.log(result);
    mutate(notifications.map((n: Notification) => n.id === id ? {...n, read: true} : n));
  }

  const markAllAsReadHandler = async () => {
    const result = await markAllAsRead(user.id);
    console.log(result);
    mutate(notifications.map((n: Notification) => ({...n, read: true})));
  }

  const deleteNotificationHandler = async (id: number) => {
    const result = await deleteNotification(id);
    console.log(result);
    mutate(notifications.filter((n: Notification) => n.id !== id));
  }

  const deleteAllNotificationsHandler = async () => {
    const result = await deleteAllNotifications(user.id);
    console.log(result);
    mutate([]);
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <Title>Notifications</Title>
        <div className='flex items-center gap-1'>
          <GradientButton type='light' attributes={{onClick: markAllAsReadHandler}}>Mark all as read</GradientButton>
          <GradientButton type='red' attributes={{onClick: deleteAllNotificationsHandler}}>Delete all</GradientButton>
        </div>
      </div>
      <section>
        <ul className='flex flex-col gap-1'>
          {notifications?.map((notification: Notification) => (
            <NotificationLi key={notification.id} isRead={notification.read} body={notification.body}>
              <div className='flex gap-1'>
                {!notification.read && <GradientButton icon={BsEnvelopeOpen} attributes={{onClick: () => markAsReadHandler(notification.id)}} type='light'>
                  Mark as read
                </GradientButton>}
                <GradientButton icon={BsTrash} attributes={{onClick: () => deleteNotificationHandler(notification.id)}} type='red' />
              </div>
            </NotificationLi>))}
        </ul>
      </section>
      {/* <section>
        <Subtitle>Connection Requests</Subtitle>
        <ul>
          {incomingRequests?.map((connection, i) => (
            <UserLi key={i} name={`${connection.firstName} ${connection.lastName}`}>
              <div className='flex gap-1'>
                <GradientButton attributes={{onClick: () => accept(connection.id)}} type='light'>Accept</GradientButton>
                <GradientButton attributes={{onClick: () => decline(connection.id)}} type='red'>Decline</GradientButton>
              </div>
            </UserLi>))}
        </ul>
      </section> */}
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;