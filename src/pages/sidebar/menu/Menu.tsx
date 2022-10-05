import React, { useState } from "react";
import { CATEGORY } from "../../../data/constants/category";
import Application from "../../../data/interfaces/application";
import { useAppSelector } from "../../../hooks/use-app-selector";
import MenuItem from "../menu-item/MenuItem";

import "./Menu.scss";

interface Props {
  applications: Application[];
}

export const Menu: React.FC<Props> = ({ applications }) => {
  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  );

  const ACTION_FEED = CATEGORY.ACTION_FEED;
  const INFORMATION_FEED = CATEGORY.INFORMATION_FEED;

  const [displayedCategories, setDisplayedCategories] = useState([
    ACTION_FEED,
    INFORMATION_FEED,
  ]);

  // edit the displayedCategories array to show / hide submenu
  const toggleMenuHandler = (category: number) => {
    if (displayedCategories.includes(category)) {
      const categoryIndex = displayedCategories.findIndex(
        (c) => c === category
      );
      setDisplayedCategories((c) =>
        // return the array without the category
        c.slice(0, categoryIndex).concat(c.slice(categoryIndex + 1, c.length))
      );
    } else {
      setDisplayedCategories((c) => [...c, category]);
    }
  };

  const getAppsByCategory = (category: number): Application[] => {
    const filterValue =
      category === CATEGORY.ACTION_FEED ? "workflow" : "socialflow";
    return applications?.filter((app) => app.type === filterValue);
  };

  const getMenuItemsByCategory = (category: number): JSX.Element[] | null => {
    const items = getAppsByCategory(category).map((app, i) => (
      <MenuItem key={i} application={app} category={ACTION_FEED}></MenuItem>
    ));

    if (items.length > 0 && displayedCategories.includes(category)) {
      return items;
    }
    return null;
  };

  const getAppCountByCategory = (category: number): number | null => {
    const count = getAppsByCategory(category).reduce((count, application) => {
      return (count += notifications.filter((n) =>
        application.match.split(",").includes(n.title.trim().toLowerCase())
      ).length);
    }, 0);
    if (count > 0) return count;
    return null;
  };

  return (
    <>
      <div onClick={() => toggleMenuHandler(ACTION_FEED)}>
        <span>ACTION FEED</span>
        {<span>{getAppCountByCategory(ACTION_FEED)}</span>}
      </div>
      {getMenuItemsByCategory(ACTION_FEED)}

      <div onClick={() => toggleMenuHandler(INFORMATION_FEED)}>
        <span>INFORMATION FEED</span>
        <span>{getAppCountByCategory(INFORMATION_FEED)}</span>
      </div>
      {getMenuItemsByCategory(INFORMATION_FEED)}
    </>
  );
};

export default Menu;
