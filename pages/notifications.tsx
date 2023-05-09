import GradientButton from "@/components/buttons/gradient-button";
import NotificationLi from "@/components/list items/notification-li";
import Title from "@/components/misc/title";
import { NotificationsContext } from "@/context/notifications-context";
import { UserContext } from "@/context/user-context";
import PrimaryLayout from "@/layouts/primary-layout";
import { useNotificationsModify, useNotificationsRead } from "@/services/notifications-service";
import { Notification } from "@/utils/types";
import { ReactNode, useContext } from "react";
import { BsEnvelopeOpen, BsTrash } from "react-icons/bs";

const Page = () => {
  const { user } = useContext(UserContext);
  const { notifications, mutate } = useContext(NotificationsContext);
  const { markAsRead, markAllAsRead } = useNotificationsRead();
  const { deleteNotification, deleteAllNotifications } = useNotificationsModify();

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
        {!notifications.length ? <p>You don&apos;t have any notifications.</p> :
        <ul className='flex flex-col gap-1'>
          {notifications.map((notification: Notification) => (
            <NotificationLi key={notification.id} isRead={notification.read} body={notification.body}>
              <div className='flex gap-1'>
                {!notification.read && <GradientButton icon={BsEnvelopeOpen} attributes={{onClick: () => markAsReadHandler(notification.id)}} type='light' />}
                <GradientButton icon={BsTrash} attributes={{onClick: () => deleteNotificationHandler(notification.id)}} type='red' />
              </div>
            </NotificationLi>))}
        </ul>}
      </section>
    </>
  );
}

Page.getLayout = (page: ReactNode) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page;