import {
  getNotifications,
  setNotificationIsSeen,
  dismissNotification as _dismissNotification,
  setNotificationIsRead as _setNotificationIsRead
} from "./../services/notification-service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "./index";
import Notification from "../data/interfaces/notification";

const initialState = {
  notificationItems: [] as Notification[],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    load(state, action: PayloadAction<Notification[]>) {
      state.notificationItems = action.payload;
    },
  },
});

export const fetchNotifications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const notifications: Notification[] = await getNotifications();
      dispatch(notificationActions.load(notifications));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNotificationsIsSeen = (category: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const allNotifications: Notification[] = await getNotifications();
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

export const dismissNotification = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await _dismissNotification(id);
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  };
};

export const setNotificationIsRead = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await _setNotificationIsRead(id, true);
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  }
}

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
