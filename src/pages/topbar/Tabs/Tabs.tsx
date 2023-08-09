import React from "react";
import classNames from "classnames";
import { STATUS } from "../../../data/constants/status";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";

import { Toggle } from '@trading/energies-ui'

import "./Tabs.scss";
import { CATEGORY } from "../../../data/constants/category";

export const Tabs: React.FC = () => {
  const selectedStatus = useAppSelector(
    (state) => state.filters.selectedStatus
  );
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const dispatch = useAppDispatch();

  const tabClickHandler = (status: number) => {
    dispatch(filtersActions.setSelectedStatus(status));
  };

  return (
    <Toggle
      active={selectedStatus.toString()}
      items={[
        {
          key: STATUS.TO_BE_TREATED.toString(),
          title: selectedCategory === CATEGORY.ACTION_FEED ? "TO BE TREATED" : selectedCategory === CATEGORY.INFORMATION_FEED ? "LAST RECEIVED" : "",
        },
        {
          key: STATUS.TREATED.toString(),
          title: selectedCategory === CATEGORY.ACTION_FEED ? "TREATED" : selectedCategory === CATEGORY.INFORMATION_FEED ? "HISTORY" : "",
        },
      ]}
      variant='pastel'
      onChange={(e: string) => tabClickHandler(parseInt(e))}
    />
  );
};

export default Tabs;
