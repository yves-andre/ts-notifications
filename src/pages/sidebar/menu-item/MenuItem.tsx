import React from "react";
import Application from "../../../data/interfaces/application";
import classNames from "classnames";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";
import "./MenuItem.scss";

interface Props {
  application: Application;
  category: number;
}

export const MenuItem: React.FC<Props> = ({ application, category }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const selectedApplication = useAppSelector(
    (state) => state.filters.selectedApplication
  );

  const selectAppHandler = (match: string) => {
    selectedApplication === match
      ? dispatch(filtersActions.setSelectedApplication(""))
      : dispatch(filtersActions.setSelectedApplication(match));
    dispatch(filtersActions.setSelectedCategory(category));
  };

  const applicationCount = notifications.filter((n) =>
    application.match.split(",").includes(n.title.trim().toLowerCase())
  ).length;

  return (
    <div onClick={() => selectAppHandler(application.match)} 
      className={classNames({
        'Menu-item': true,
        'Menu-item-active': selectedApplication === application.match,
      })}>
      <span>{application.title}</span>
      <span>{applicationCount > 0 && applicationCount}</span>
    </div>
  );
};

export default MenuItem;

