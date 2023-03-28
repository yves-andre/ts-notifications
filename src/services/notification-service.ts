import { NotificationCount } from "./../data/interfaces/notification-count";
import { CATEGORY } from "./../data/constants/category";
import { httpGet, httpPut } from "./_http-client";
import { getRawUserLogin, getUserLogin } from "./auth-service";

const defaultRequestConfig = {
  headers: {
    Accept: "application/json"
  }
};

export const getNotifications = async (category?: number, status?: number) => {
  let url = "";
  if (process.env.NODE_ENV === "development") {
    url = "/notifications.json"
  } else {
    url = `/${category}/${status}`;
  }
  const notifications = await httpGet(
    url,
    defaultRequestConfig,
    true
  );
  return notifications;
};

export const getNotificationCountByCategory = async (category: number) => {
  let notificationCount: NotificationCount;
  switch (category) {
    case CATEGORY.ACTION_FEED:
      notificationCount = (await httpGet(
        process.env.REACT_APP_API_ACTION_FEED_NOTIFICATION_COUNT as string,
        defaultRequestConfig,
        true
      )) as NotificationCount;
      break;
    case CATEGORY.INFORMATION_FEED:
      notificationCount = (await httpGet(
        process.env.REACT_APP_API_INFORMATION_FEED_NOTIFICATION_COUNT as string,
        defaultRequestConfig,
        true
      )) as NotificationCount;
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
    {
      ...defaultRequestConfig,
      headers: {
        ...defaultRequestConfig.headers,
        "Content-Type": "application/json",
      },
    },
    true
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
    {
      ...defaultRequestConfig,
      headers: {
        ...defaultRequestConfig.headers,
        "Content-Type": "application/json",
      },
    },
    true
  );
  return result;
};

export const dismissNotification = async (id: string) => {
  const rawLoginName = await getRawUserLogin();
  const result = httpPut(
    process.env.REACT_APP_API_UPDATE_NOTIFICATION?.replace(
      "{id}",
      id
    ) as string,
    { status: 2, isRead: 1, treatedBy: rawLoginName, treatedOn: new Date().toISOString() },
    {
      ...defaultRequestConfig,
      headers: {
        ...defaultRequestConfig.headers,
        "Content-Type": "application/json",
      },
    },
    true
  );
  return result;
};
