import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CATEGORY } from "../data/constants/category";
import { STATUS } from "../data/constants/status";

const initialState = {
  selectedCategory: CATEGORY.ACTION_FEED,
  selectedStatus: STATUS.TO_BE_TREATED,
  selectedApplication: "",
  showDelegations: undefined,
  searchFilter: "",
  sortFilter: {
    field: "date",
    asc: false
  },
} as {
  selectedCategory: number,
  selectedStatus: number,
  selectedApplication: string,
  showDelegations: boolean | undefined,
  searchFilter: string,
  sortFilter: {
    field: string,
    asc: boolean
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<number>) {
      state.selectedCategory = action.payload;
    },
    setSelectedStatus(state, action: PayloadAction<number>) {
      state.selectedStatus = action.payload;
    },
    setSelectedApplication(state, action: PayloadAction<string>) {
      state.selectedApplication = action.payload;
    },
    toggleShowDelegations(state, action: PayloadAction<boolean | undefined>) {
      state.showDelegations = action.payload;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.searchFilter = action.payload;
    },
    setSortFilter(state, action: PayloadAction<{field: string, asc: boolean}>) {
      state.sortFilter = action.payload;
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice;
