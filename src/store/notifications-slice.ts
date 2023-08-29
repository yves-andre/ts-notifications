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
  getNotificationsLocal,
} from "./../services/notification-service";
import {
  createSlice,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./index";
import Notification from "../data/interfaces/notification";

interface StatusObject {
  items: Notification[];
  loaded: boolean;
  error: number | null;
}

interface CategoryObject {
  [key: number]: StatusObject;
}

type NotificationsItemsByCategory = {
  [key: number]: CategoryObject;
};

const initialState = {
  notificationCounts: [] as NotificationCount[],
  notificationsItemsByCategory: {
    0: {
      1: {
        items: [] as Notification[],
        loaded: false as boolean,
        error: null as number | null,
      },
      2: {
        items: [] as Notification[],
        loaded: false as boolean,
        error: null as number | null,
      },
    },
    1: {
      1: {
        items: [] as Notification[],
        loaded: false as boolean,
        error: null as number | null,
      },
      2: {
        items: [] as Notification[],
        loaded: false as boolean,
        error: null as number | null,
      },
    },
  } as NotificationsItemsByCategory,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotificationCount(state, action: PayloadAction<NotificationCount[]>) {
      state.notificationCounts = action.payload;
    },
    setAllNotifications(state, action: PayloadAction<Notification[]>) {
      const notifications = action.payload;
      notifications.map((notification: Notification) => {
        const newItems = {...state.notificationsItemsByCategory};
        newItems[notification.category][notification.status] = {
          items: [...newItems[notification.category][notification.status].items, notification],
          loaded: true,
          error: null
        };
        state.notificationsItemsByCategory = newItems;
      })
    },
    setNotificationsItemsByCategory(
      state,
      action: PayloadAction<{
        status: number;
        category: number;
        value: StatusObject;
      }>
    ) {
      state.notificationsItemsByCategory[action.payload.category][
        action.payload.status
      ] = action.payload.value;
    },
    updatePendingStatus(
      state,
      action: PayloadAction<{ notificationId: string; isPending: boolean }>
    ) {
      // Iterate over each category object
      Object.keys(state.notificationsItemsByCategory).forEach((categoryKey) => {
        // Iterate over each status object inside a category
        Object.keys(state.notificationsItemsByCategory[+categoryKey]).forEach((statusKey) => {
          // Find the notification that matches the provided ID
          const notificationIndex = state.notificationsItemsByCategory[+categoryKey][+statusKey].items.findIndex(
            (notification) => notification._id === action.payload.notificationId
          );
    
          // If a matching notification is found, update its properties
          if (notificationIndex !== -1) {
            const notification = state.notificationsItemsByCategory[+categoryKey][+statusKey].items[notificationIndex];
            notification.isPending = action.payload.isPending;
            notification.pendingFrom = new Date().toISOString();
          }
        });
      });
    },
    resetLoaded(state, action: PayloadAction<{selectedStatus: number, selectedCategory: number}>) {
      const { selectedStatus, selectedCategory } = action.payload;
      
      if (state.notificationsItemsByCategory[selectedCategory] &&
          state.notificationsItemsByCategory[selectedCategory][selectedStatus]) {
        state.notificationsItemsByCategory[selectedCategory][selectedStatus].loaded = false;
      } else {
        console.warn('Invalid category or status. Could not reset the "loaded" flag.');
      }
    },
  },
});

const flattenNotificationItems = (state: typeof initialState): Notification[] => {
  let notificationItems: Notification[] = [];

  Object.keys(state.notificationsItemsByCategory).forEach((outerKey: any) => {
    const innerObj = state.notificationsItemsByCategory[outerKey];

    Object.keys(innerObj).forEach((innerKey: any) => {
      notificationItems = notificationItems.concat(innerObj[innerKey].items);
    });
  });

  return notificationItems;
};

export const selectFlatNotificationItems = createSelector(
  (state: { notifications: typeof initialState }) => state.notifications,
  (state) => flattenNotificationItems(state)
);

// A simple selector to get the entire notificationsItemsByCategory object from the state
const getNotificationsItemsByCategory = (state: any) =>
  state.notifications.notificationsItemsByCategory;

// A selector that takes the category number and status number and returns the relevant StatusObject
export const getNotificationItemsByCategoryAndStatus = createSelector(
  [
    getNotificationsItemsByCategory,
    (state: any, category: number, status: number) => ({ category, status }),
  ],
  (notificationsItemsByCategory, { category, status }) => {
    // Check if the category exists in the state
    if (notificationsItemsByCategory[category]) {
      // Check if the status exists within that category
      if (notificationsItemsByCategory[category][status]) {
        return notificationsItemsByCategory[category][status];
      }
    }
    return null;
  }
);

const selectNotifications = (state: RootState) => {
  return flattenNotificationItems(state.notifications);
};

export const selectNotificationById = (notificationId: any) =>
  createSelector(selectNotifications, (notifications) =>
    notifications?.find(
      (notification: { _id: any }) => notification._id === notificationId
    )
  );

const reFetchLoadedNotifications = async (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState();
  const notificationsItemsByCategory = state.notifications.notificationsItemsByCategory;
  const categories = Object.keys(notificationsItemsByCategory);

  for (const category of categories) {
    const statuses = Object.keys(notificationsItemsByCategory[+category]);
    for (const status of statuses) {
      if (notificationsItemsByCategory[+category][+status].loaded) {
        await dispatch(fetchNotificationsByStatusAndCategory(Number(status), Number(category)));
      }
    }
  }
};


export const fetchNotificationsByStatusAndCategory = (
  selectedStatus: number,
  selectedCategory: number,
  resetLoadedState: boolean = false
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {      
      if (resetLoadedState) {
        dispatch(notificationActions.resetLoaded({selectedStatus, selectedCategory}));
      }

      let currentNotifications =
        getState().notifications.notificationsItemsByCategory;
      let currentNotification =
        currentNotifications[selectedCategory][selectedStatus];

      if (!currentNotification) {
        throw new Error("Invalid status or category");
      }

      // fetch the notification if it hasn't been fetched yet
      if (!currentNotification.loaded) {
        const currentRouteNotifications = await getNotifications(
          selectedStatus,
          selectedCategory
        );

        // Create a new object based on currentNotification
        let newNotification = {
          ...currentNotification,
        };

        // if we have a network error, we save the error in the error field,
        // else, we set the loaded value to true.
        if (typeof currentRouteNotifications === "number") {
          newNotification.loaded = false;
          newNotification.error = currentRouteNotifications;
        } else {
          newNotification.loaded = true;
          newNotification.error = null;
          newNotification.items = currentRouteNotifications;
        }

        // set the treated by and treatedOn value
        if (newNotification.items) {
          newNotification.items = await Promise.all(
            newNotification.items.map(async (notification: Notification) => {
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

        dispatch(
          notificationActions.setNotificationsItemsByCategory({
            category: selectedCategory,
            status: selectedStatus,
            value: newNotification,
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
      // Get the flattened state here
      const allNotifications = selectFlatNotificationItems(getState());
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

      // call the reFetchLoadedNotifications to update the notifications
      // in the consumer components
      reFetchLoadedNotifications(dispatch, getState);
    } catch (error) {
      console.error(error);
    }
  };
};

export const setNotificationsIsSeenByIds = (ids: string[]) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const promisesList: any[] = [];
    ids.forEach((notificationId) => {
      promisesList.push(_setNotificationIsSeen(notificationId, true));
    });
    Promise.all(promisesList).then(
      () => {
        reFetchLoadedNotifications(dispatch, getState);
        fetchNotificationCounts();
      },
      (error) => {
        console.log(error);
      }
    );
  };
};

export const dismissNotificationById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await _dismissNotification(id);
      reFetchLoadedNotifications(dispatch, getState);
    } catch (error) {
      console.log(error);
    }
  };
};

export const dismissNotifications = (notifications: Notification[]) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await _dismissNotifications();
    } catch (error) {
      console.log(error);
    } finally {
      reFetchLoadedNotifications(dispatch, getState);
    }
  };
};

export const setNotificationIsReadById = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await _setNotificationIsRead(id, true);
      reFetchLoadedNotifications(dispatch, getState);
    } catch (error) {
      console.log(error);
    }
  };
};

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
