import { formatDate } from './../utils/formatters';
import { getUserNameFromLogin } from './../services/auth-service';
import { NotificationCount } from "./../data/interfaces/notification-count";
import {
  getNotifications,
  setNotificationIsSeen as _setNotificationIsSeen,
  dismissNotification as _dismissNotification,
  setNotificationIsRead as _setNotificationIsRead,
  dismissNotifications as _dismissNotifications,
  getNotificationCounts,
} from "./../services/notification-service";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./index";
import Notification from "../data/interfaces/notification";
import { FILTER } from '../data/constants/filter';

const initialState = {
  notificationItems: null as Notification[] | null,
  notificationCounts: [] as NotificationCount[],
  notificationError: null as number | null
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    reset(state){
      state.notificationItems = null;
    },
    resetNotificationError(state) {
      state.notificationError = null;
    },
    load(state, action: PayloadAction<Notification[]>) {
      if(typeof action.payload === "number"){
        const error = action.payload;
        state.notificationError = error;
      }else{
        state.notificationItems = action.payload;
      }
    },
    getNotificationCount(state, action: PayloadAction<NotificationCount[]>) {
      state.notificationCounts = action.payload;
    },
    append(state, action: PayloadAction<Notification[]>) {
      if(typeof action.payload === "number"){
        const error = action.payload;
        state.notificationError = error;
      }
      else {
        if (state.notificationItems) {
          state.notificationItems.push(...action.payload);
        } else {
          state.notificationItems = action.payload;
        }
      }
    },
    updatePendingStatus(state, action: PayloadAction<{ notificationId: string; isPending: boolean }>) {
      const notification = state.notificationItems?.find(
        (notification) => notification._id === action.payload.notificationId
      );
      if (notification) {
        notification.isPending = action.payload.isPending;
        notification.pendingFrom = new Date().toISOString();
      }
      // replace the notificationItems array with a new array
      // to trigger a re-render
      state.notificationItems = [...state.notificationItems!];
    }
  },
});


const selectNotifications = (state: { notifications: { notificationItems: any; }; }) => {
  return state.notifications.notificationItems;
};

export const selectNotificationById = (notificationId: any) =>
  createSelector(
    selectNotifications,
    notifications => notifications?.find((notification: { _id: any; }) => notification._id === notificationId)
  );

export const fetchNotifications = (searchParams: URLSearchParams | null = null) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      let notifications = null;
      if (getState().notifications.notificationItems) {
        const data = await getAllNotificationsLoad();
        notifications = data.result;
        if(!data.hasErrors) {
          dispatch(notificationActions.resetNotificationError());
        }
      } else {
        await getAllNotificationsAppend(dispatch, searchParams);
        notifications = getState().notifications.notificationItems;
      }
      if (notifications) {
        notifications = await Promise.all(
          notifications.map(async (notification: Notification) => {
            let updatedNotification = { ...notification }; // Create a shallow copy of the notification object
            if (updatedNotification.treatedBy) {
              updatedNotification.treatedBy = await getUserNameFromLogin(notification.treatedBy);
              if (updatedNotification.treatedOn) {
                updatedNotification.treatedOn = formatDate(updatedNotification.treatedOn);
              }
            }
            return updatedNotification;
          })
        );
        dispatch(notificationActions.load(notifications));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const resetNotificationError = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(notificationActions.resetNotificationError());
    } catch (error) {
      console.error(error);
    }
  }
}


export const fetchNotificationCounts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const counts = await getNotificationCounts();
      dispatch(notificationActions.getNotificationCount(counts));
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNotificationsIsSeen = (category: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const allNotifications: Notification[] | null = getState().notifications.notificationItems;

      if (!allNotifications) return;

      // get the notifications by category, that have not been seen
      const filteredNotifications = allNotifications
        .filter((notification) => notification.category === category)
        .filter((notification) => notification.isSeen === false);

      // we set the isSeen property to true for each notification
      await Promise.all(
        filteredNotifications.map(async (notification) => {
          await _setNotificationIsSeen(notification._id, true);
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

export const setNotificationsIsSeenByIds = (ids: string[]) => {
  return async (dispatch: AppDispatch) => {
    const promisesList: any[] = [];
    ids.forEach((notificationId ) => {
      promisesList.push(_setNotificationIsSeen(notificationId, true))
    })
    Promise.all(promisesList).then(() => {
      dispatch(fetchNotifications());
    }, (error) => {
      console.log(error);
    })
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
    dispatch(notificationActions.reset());
    try {
      await _dismissNotifications();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(fetchNotifications());
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

const getAllNotificationsLoad = async () => {
  if(process.env.NODE_ENV === "local") {
    return await getNotifications();
  }

  let hasErrors = false;

  const promises = [
    getNotifications(0, 0),
    getNotifications(1, 0),
    getNotifications(0, 1),
    getNotifications(1, 1),
    getNotifications(2, 0),
    getNotifications(2, 1),
  ].map((promise) =>
    promise.then((result) => {
      if (Array.isArray(result)) {
        return result;
      }
      hasErrors = true;
      return [];
    })
  );

  const [n1, n2, n3, n4, n5, n6]: Notification[][] = await Promise.all(promises);
  const result = [...n1, ...n2, ...n3, ...n4, ...n5, ...n6];
  return {result: result, hasErrors: hasErrors};
}


const getAllNotificationsAppend = async (dispatch: AppDispatch, searchParams: URLSearchParams | null = null) => {
  if (process.env.NODE_ENV === "local") {
    const notifications = await getNotifications();
    dispatch(notificationActions.append(notifications));
    return;
  };

  // get the current category and status from the url
  const selectedCategory = +(searchParams?.get(FILTER.SELECTED_CATEGORY) || "0");
  const selectedStatus = +(searchParams?.get(FILTER.SELECTED_STATUS) || "1");

  const priorityPromise = getNotifications(selectedStatus, selectedCategory);

  const allCombinations = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 0],
    [2, 1],
  ];

  // Remove the one matching selectedCategory and selectedStatus from allCombinations
  const filteredCombinations = allCombinations.filter(
    ([status, category]) => !(category === selectedCategory && status === selectedStatus)
  );

  // First await the priorityPromise
  const priorityNotifications = await priorityPromise;
  dispatch(notificationActions.append(priorityNotifications));

  // Then await the other promises in the notificationPromises array
  for (const [category, status] of filteredCombinations) {
    const notifications = await getNotifications(category, status);
    dispatch(notificationActions.append(notifications));
  }
};

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
