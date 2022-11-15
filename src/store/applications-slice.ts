import { getCategoryColors } from './../services/category-service';
import { sortArrayByStringField } from './../utils/helpers';
import { AppDispatch } from './index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Application from "../data/interfaces/application";
import { getApplications } from '../services/application-service';
import CategoryColor from '../data/interfaces/category-color';

const initialState = {
  applications: [] as Application[],
  categoryColors: [] as CategoryColor[]
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    loadApplications(state, action: PayloadAction<Application[]>) {
      // sort by title
      const applications = sortArrayByStringField(action.payload, "title", true);
      state.applications = applications;
    },
    loadCategoryColors(state, action: PayloadAction<CategoryColor[]>) {
      state.categoryColors = action.payload;
    },
  },
});

export const fetchApplications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const applications: Application[] = await getApplications();
      dispatch(applicatoinActions.loadApplications(applications));
    } catch(error) {
      console.error(error);
    }
  }
}

export const fetchCategoryColors = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const categoryColors: CategoryColor[] = await getCategoryColors();
      dispatch(applicatoinActions.loadCategoryColors(categoryColors));
    } catch(error) {
      console.error(error);
    }
  }
}

export const applicatoinActions = applicationsSlice.actions;

export default applicationsSlice;