import { formatDate } from "./../utils/formatters";
import { getUserNameFromLogin } from "./../services/auth-service";
import { CATEGORY } from "./../data/constants/category";
import { NotificationCount } from "./../data/interfaces/notification-count";
import {
  getNotifications,
  setNotificationIsSeen as _setNotificationIsSeen,
  dismissNotification as _dismissNotification,
  setNotificationIsRead as _setNotificationIsRead,
  dismissNotifications as _dismissNotifications,
  getNotificationCountByCategory,
} from "./../services/notification-service";
import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./index";
import Notification from "../data/interfaces/notification";
import { FILTER } from "../data/constants/filter";
import { NotificationError } from "../data/interfaces/notification-error";
import { STATUS } from "../data/constants/status";

const initialState = {
  notificationItems: null as Notification[] | null,
  notificationCounts: [] as NotificationCount[],
  notificationError: null as NotificationError | null,
  notificationCombinations: [
    [STATUS.TO_BE_TREATED, CATEGORY.ACTION_FEED], // 1/0
    [STATUS.TREATED, CATEGORY.ACTION_FEED], // 2/0
    [STATUS.TO_BE_TREATED, CATEGORY.INFORMATION_FEED], // 1/1
    [STATUS.TREATED, CATEGORY.INFORMATION_FEED], // 2/1
  ] as number[][],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    reset(state) {
      state.notificationItems = null;
    },
    setNotificationError(
      state,
      action: PayloadAction<NotificationError | null>
    ) {
      state.notificationError = action.payload;
    },
    getNotificationCount(state, action: PayloadAction<NotificationCount[]>) {
      state.notificationCounts = action.payload;
    },
    setNotificationCombinations(state, action: PayloadAction<number[][]>) {
      state.notificationCombinations = action.payload;
    },
    appendNotifications(state, action: PayloadAction<Notification[]>) {
      if (typeof action.payload === "number") {
        const error = action.payload;
        state.notificationError = error;
      } else {
        if (state.notificationItems) {
          state.notificationItems.push(...action.payload);
        } else {
          state.notificationItems = action.payload;
        }
      }
    },
    updatePendingStatus(
      state,
      action: PayloadAction<{ notificationId: string; isPending: boolean }>
    ) {
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
    },
  },
});

const selectNotifications = (state: {
  notifications: { notificationItems: any };
}) => {
  return state.notifications.notificationItems;
};

export const selectNotificationById = (notificationId: any) =>
  createSelector(selectNotifications, (notifications) =>
    notifications?.find(
      (notification: { _id: any }) => notification._id === notificationId
    )
  );

export const getNotificationsByStatusAndCategory = (
  selectedStatus: number,
  selectedCategory: number
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      if (process.env.NODE_ENV === "local") {
        const notifications = await getNotifications();
        dispatch(notificationActions.appendNotifications(notifications));
        return;
      }

      const notificationCombinations =
        getState().notifications.notificationCombinations;
      const currentNotifications = getState().notifications.notificationItems;
      const notificationError = getState().notifications.notificationError;

      // fetch the notification if it hasn't been fetched yet
      if (
        notificationCombinations.some(
          (c) => c[0] === selectedStatus && c[1] === selectedCategory
        )
      ) {
        const currentRouteNotifications = await getNotifications(
          selectedStatus,
          selectedCategory
        );
        // if we have a network error, we save the error number, else, we remove the route combination.
        // This way, we keep repeting the call when there is a newtwork error.
        if (typeof currentRouteNotifications === "number") {
          dispatch(
            notificationActions.setNotificationError({
              code: currentRouteNotifications as number,
              status: selectedStatus,
              category: selectedCategory,
            })
          );
          return currentNotifications;
        } else {
          //remove the notification error if it was broken on the previous call
          if (
            notificationError?.status === selectedStatus &&
            notificationError?.category === selectedCategory
          ) {
            dispatch(notificationActions.setNotificationError(null));
          }
          // Remove the one matching selectedCategory and selectedStatus from allCombinations
          const filteredCombinations = notificationCombinations.filter(
            ([status, category]) =>
              !(category === selectedCategory && status === selectedStatus)
          );
          // Set the new resulting combinations (that haven't been called yet)
          dispatch(
            notificationActions.setNotificationCombinations(
              filteredCombinations
            )
          );
          dispatch(
            notificationActions.appendNotifications(currentRouteNotifications)
          );
          return currentRouteNotifications;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchNotifications = (
  searchParams: URLSearchParams | null = null
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // get the current category and status from the url
      const selectedCategory = +(
        searchParams?.get(FILTER.SELECTED_CATEGORY) || "0"
      );
      const selectedStatus = +(
        searchParams?.get(FILTER.SELECTED_STATUS) || "1"
      );
      let newNotifications = await dispatch(
        getNotificationsByStatusAndCategory(selectedStatus, selectedCategory)
      );
      if (newNotifications) {
        newNotifications = await Promise.all(
          newNotifications.map(async (notification: Notification) => {
            let updatedNotification = { ...notification }; // Create a shallow copy of the notification object
            if (updatedNotification.treatedBy) {
              updatedNotification.treatedBy = await getUserNameFromLogin(
                notification.treatedBy
              );
              if (updatedNotification.treatedOn) {
                updatedNotification.treatedOn = formatDate(
                  updatedNotification.treatedOn
                );
              }
            }
            return updatedNotification;
          })
        );
      }
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
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const allNotifications: Notification[] | null =
        getState().notifications.notificationItems;

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
    ids.forEach((notificationId) => {
      promisesList.push(_setNotificationIsSeen(notificationId, true));
    });
    Promise.all(promisesList).then(
      () => {
        dispatch(fetchNotifications());
      },
      (error) => {
        console.log(error);
      }
    );
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

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
