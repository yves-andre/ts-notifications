import { getNotifications } from './../services/notification-service';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from './index';
import Notification from '../data/interfaces/notification';

const initialState = {
  notificationItems: [] as Notification[]
}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    load(state, action: PayloadAction<Notification[]>) {
      state.notificationItems = action.payload;
    }
  }
});

export const fetchNotifications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const notifications: Notification[] = await getNotifications();
      dispatch(notificationActions.load(notifications));
    } catch (error) {
      console.error(error);
    }
  }
};

export const notificationActions = notificationSlice.actions;

export default notificationSlice;