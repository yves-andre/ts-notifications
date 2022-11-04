import { AppDispatch } from './index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Application from "../data/interfaces/application";
import { getApplications } from '../services/application-service';

const initialState = {
  applications: [] as Application[],
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    load(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
  },
});

export const fetchApplications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const applications: Application[] = await getApplications();
      dispatch(applicatoinActions.load(applications));
    } catch(error) {
      console.error(error);
    }
  }
}

export const applicatoinActions = applicationsSlice.actions;

export default applicationsSlice;