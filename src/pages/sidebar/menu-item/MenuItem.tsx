import React from "react";
import Application from "../../../data/interfaces/application";
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

  const selectAppHandler = (match: string) => {
    dispatch(filtersActions.setSelectedApplication(match));
    dispatch(filtersActions.setSelectedCategory(category));
  };

  const applicationCount = notifications.filter((n) =>
    application.match.split(",").includes(n.title.trim().toLowerCase())
  ).length;

  return (
    <li onClick={() => selectAppHandler(application.match)}>
      {application.title}
      {applicationCount > 0 && applicationCount}
    </li>
  );
};

export default MenuItem;
