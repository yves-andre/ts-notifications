import { NotificationCount } from "./../data/interfaces/notification-count";
import { CATEGORY } from "./../data/constants/category";
import { httpGet, httpPut } from "./_http-client";
import { getRawUserLogin, getUserLogin } from "./auth-service";
import Notification from "../data/interfaces/notification";


const defaultRequestConfig = {
  headers: {
    Accept: "application/json"
  }
};

export const getNotificationsLocal = async () => {
  const url = "/notifications.json";
  const notifications = await httpGet(
    url,
    defaultRequestConfig,
    true
  );
  return notifications;
}

export const getNotifications = async (category?: number, status?: number) => {
  if (process.env.NODE_ENV === "local") {
    return await getNotificationsLocal();
  }
  const url = `/${category}/${status}`;
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

export const dismissNotifications = async () => {
  const rawLoginName = await getRawUserLogin();
  const result = httpPut(process.env.REACT_APP_API_DISMISS_URL as string, 
    { treatedBy: rawLoginName }, 
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
}


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

export const getValidationFormById = async (id: string, signal:AbortSignal): Promise<any> => {
  const response = await httpGet(
    `${process.env.REACT_APP_API_GET_VALIDATION_FORM}/${id}`,
    {...defaultRequestConfig, signal},
    true
  );
  // Check if the operation was canceled
  if (signal.aborted) {
    throw new Error("Operation canceled by the user.");
  }
  return response;
};

export const validateFormById = async (id: string, data:any): Promise<any> => {
  return await httpPut(
    `${process.env.REACT_APP_API_UPDATE_VALIDATION_STATUS}/${id}`,
    data,
    { headers: {
      'Content-Type' : 'application/json'
      }
    },
    true
  );
};

export const updateFormPendingTimeout = async (reference: string): Promise<any> => {
  const data = {
    isPending: false
  }
  return await httpPut(
    `${process.env.REACT_APP_API_UPDATE_NOTIFICATION_BY_REFERENCE}/${reference}`,
    data,
    { headers: {
      'Content-Type' : 'application/json'
      }
    },
    true
  );
};

export const getNotificationIsPending = (notification: Notification): { isPending: boolean, isTimeout: boolean, message: string } => {
  const MAXIMUM_PENDING_TIME_MINUTES = 10;
  if (!notification.isPending || !notification.pendingFrom || notification.category !== 0) {
    return {isPending: false, isTimeout: false, message: ""};
  }
  const pendingFrom = new Date(notification.pendingFrom);
  const now = new Date();
  // check that difference between pendingFrom and now is less than 10 minutes
  const timeDifferenceInMilliseconds = Math.abs(now.getTime() - pendingFrom.getTime());
  const tenMinutesInMilliseconds = MAXIMUM_PENDING_TIME_MINUTES * 60 * 1000; // 10 minutes in milliseconds
  return {
    isPending: timeDifferenceInMilliseconds < tenMinutesInMilliseconds,
    isTimeout: timeDifferenceInMilliseconds > tenMinutesInMilliseconds,
    message: "Validation form is pending for more than 10 minutes."
  }
};
