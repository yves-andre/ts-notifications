import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CATEGORY } from "../data/constants/category";
import { STATUS } from "../data/constants/status";

const initialState = {
  selectedCategory: CATEGORY.ACTION_FEED,
  selectedStatus: STATUS.TO_BE_TREATED,
  showDelegations: true,
  searchFilter: ""
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSelectedSource(state, action: PayloadAction<number>) {
      state.selectedCategory = action.payload;
    },
    setSelectedStatus(state, action: PayloadAction<number>) {
      state.selectedStatus = action.payload;
    },
    toggleShowDelegations(state, action: PayloadAction<boolean>) {
      state.showDelegations = action.payload;
    },
    setSearchFilter(state, action: PayloadAction<string>) {
      state.searchFilter = action.payload;
    },
  },
});

export const filtersActions = filtersSlice.actions;

export default filtersSlice;