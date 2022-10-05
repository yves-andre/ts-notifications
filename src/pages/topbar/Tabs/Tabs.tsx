import React from "react";
import classNames from "classnames";
import { STATUS } from "../../../data/constants/status";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";

import "./Tabs.scss";

export const Tabs: React.FC = () => {
  const selectedStatus = useAppSelector(
    (state) => state.filters.selectedStatus
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
        TO BE TREATED
      </div>

      <div
        onClick={() => tabClickHandler(STATUS.TREATED)}
        className={classNames({
          'Tab': true,
          'Tab-active': selectedStatus === STATUS.TREATED,
        })}
      >
        TREATED
      </div>
    </div>
  );
};

export default Tabs;
