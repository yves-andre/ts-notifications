import { STATUS } from './../data/constants/status';
import { CATEGORY } from "./../data/constants/category";
import { NotificationCount } from "./../data/interfaces/notification-count";
import {
  getNotifications,
  setNotificationIsSeen,
  dismissNotification as _dismissNotification,
  setNotificationIsRead as _setNotificationIsRead,
  getNotificationCountByCategory,
} from "./../services/notification-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./index";
import Notification from "../data/interfaces/notification";

const initialState = {
  notificationItems: [] as Notification[],
  notificationCounts: [] as NotificationCount[],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    load(state, action: PayloadAction<Notification[]>) {
      state.notificationItems = action.payload;
    },
    getNotificationCount(state, action: PayloadAction<NotificationCount[]>) {
      state.notificationCounts = action.payload;
    },
  },
});

export const fetchNotifications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const notifications: Notification[] = await getAllNotifications();
      dispatch(notificationActions.load(notifications));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchNotificationCounts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const notificationCounts = await Promise.all([
        getNotificationCountByCategory(CATEGORY.ACTION_FEED),
        getNotificationCountByCategory(CATEGORY.INFORMATION_FEED),
      ]);
      dispatch(notificationActions.getNotificationCount(notificationCounts));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNotificationsIsSeen = (category: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const allNotifications: Notification[] = await getAllNotifications();
      // get the notifications by category, that have not been seen
      const filteredNotifications = allNotifications
        .filter((notification) => notification.category === category)
        .filter((notification) => notification.isSeen === false);
      // we set the isSeen property to true for each notification
      await Promise.all(
        filteredNotifications.map(async (notification) => {
          await setNotificationIsSeen(notification._id, true);
        })
      );
      // call the fetchNotifications to update the notifications
      // in the consumer components
      dispatch(fetchNotifications());
    } catch (error) {
      console.error(error);
    }
  };
};

export const dismissNotificationById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await _dismissNotification(id);
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  };
};

export const dismissNotifications = (notifications: Notification[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Promise.all(
        notifications.map(async (notification) => {
          await _dismissNotification(notification._id);
        })
      );
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  };
};

export const setNotificationIsReadById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await _setNotificationIsRead(id, true);
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  };
};


const getAllNotifications = async () => {
  if(process.env.NODE_ENV === "development") {
    return await getNotifications();
  }
  const [n1,n2,n3,n4]: Notification[][] = await Promise.all([
    getNotifications(0,0),
    getNotifications(1,0),
    getNotifications(0,1),
    getNotifications(1,1),
  ]);
  const result = [...n1,...n2,...n3,...n4];
  return result;
}

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
