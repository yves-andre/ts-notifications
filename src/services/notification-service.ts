import { NotificationCount } from './../data/interfaces/notification-count';
import { CATEGORY } from "./../data/constants/category";
import { httpGet, httpPut } from "./_http-client";
export const getNotifications = async () => {
  const notifications = await httpGet(
    process.env.REACT_APP_API_NOTIFICATIONS_URL as string,
    { credentials: "include" }
  );
  return notifications;
};

export const getNotificationCountByCategory = async (category: number) => {
  let notificationCount: NotificationCount;
  switch (category) {
    case CATEGORY.ACTION_FEED:
      notificationCount = (
        await httpGet(
          process.env.REACT_APP_API_ACTION_FEED_NOTIFICATION_COUNT as string,
          { credentials: "include" }
        )
      ) as NotificationCount;
      break;
    case CATEGORY.INFORMATION_FEED:
      notificationCount = (
        await httpGet(
          process.env.REACT_APP_API_INFORMATION_FEED_NOTIFICATION_COUNT as string,
          { credentials: "include" }
        )
      ) as NotificationCount;
      break;
    default:
      throw new Error("No category matches the given parameter");
  }
  return notificationCount;
};

export const setNotificationIsSeen = async (id: string, isSeen: boolean) => {
  const result = httpPut(
    process.env.REACT_APP_API_UPDATE_NOTIFICATION?.replace(
      "{id}",
      id
    ) as string,
    { isSeen: isSeen },
    { credentials: "include" }
  );
  return result;
};

export const setNotificationIsRead = async (id: string, isRead: boolean) => {
  const result = httpPut(
    process.env.REACT_APP_API_UPDATE_NOTIFICATION?.replace(
      "{id}",
      id
    ) as string,
    { isRead: isRead },
    { credentials: "include" }
  );
  return result;
};

export const dismissNotification = async (id: string) => {
  const result = httpPut(
    process.env.REACT_APP_API_UPDATE_NOTIFICATION?.replace(
      "{id}",
      id
    ) as string,
    { status: 2 },
    { credentials: "include" }
  );
  return result;
};
