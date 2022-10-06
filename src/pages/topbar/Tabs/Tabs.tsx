import React from "react";
import classNames from "classnames";
import { STATUS } from "../../../data/constants/status";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";

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
    <div className="Tabs">
      <div
        onClick={() => tabClickHandler(STATUS.TO_BE_TREATED)}
        className={classNames({
          'Tab': true,
          'Tab-active': selectedStatus === STATUS.TO_BE_TREATED,
        })}
      >
        {selectedCategory === CATEGORY.ACTION_FEED && "TO BE TREATED"}
        {selectedCategory === CATEGORY.INFORMATION_FEED && "LAST RECEIVED"}
      </div>

      <div
        onClick={() => tabClickHandler(STATUS.TREATED)}
        className={classNames({
          'Tab': true,
          'Tab-active': selectedStatus === STATUS.TREATED,
        })}
      >
        {selectedCategory === CATEGORY.ACTION_FEED && "TREATED"}
        {selectedCategory === CATEGORY.INFORMATION_FEED && "HISTORY"}
      </div>
    </div>
  );
};

export default Tabs;
