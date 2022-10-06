import React, { useState } from "react";
import classNames from "classnames";
import { CATEGORY } from "../../../data/constants/category";
import Application from "../../../data/interfaces/application";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";

import MenuItem from "../menu-item/MenuItem";

import "./Menu.scss";

interface Props {
  applications: Application[];
}

const ACTION_FEED = CATEGORY.ACTION_FEED;
const INFORMATION_FEED = CATEGORY.INFORMATION_FEED;

const CATEGORIES = [ACTION_FEED, INFORMATION_FEED];

export const Menu: React.FC<Props> = ({ applications }) => {
  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const dispatch = useAppDispatch();

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
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return applications?.filter((app) => app.type === filterValue);
  };

  const getMenuItemsByCategory = (category: number): JSX.Element[] | null => {
    const items = getAppsByCategory(category).map((app, i) => (
      <MenuItem key={i} application={app} category={category}></MenuItem>
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

  const selectCategoryHandler = (category: number): void => {
    if (selectedCategory != category) {
      dispatch(filtersActions.setSelectedCategory(category));
      dispatch(filtersActions.setSelectedApplication(""));
      // display the categories if they are not already displayed
      displayedCategories.includes(category) || toggleMenuHandler(category);
    }
  };

  return (
    <>
      {CATEGORIES.map((category) => {
        return (
          <div className="Menu" key={category}>
            <div className="Menu-toggle">
              <span onClick={() => toggleMenuHandler(category)}>
                {displayedCategories.includes(category) && "⌄"}
                {!displayedCategories.includes(category) && "^"}
              </span>
              <div
                className={classNames({
                  "Menu-header": true,
                  "Menu-header-active": selectedCategory === category,
                })}
                onClick={() => selectCategoryHandler(category)}
              >
                {category === CATEGORY.ACTION_FEED && <span>ACTION FEED</span>}
                {category === CATEGORY.INFORMATION_FEED && (
                  <span>INFORMATION FEED</span>
                )}
                {<span>{getAppCountByCategory(category)}</span>}
              </div>
            </div>
            {getMenuItemsByCategory(category)}
          </div>
        );
      })}
    </>
  );
};

export default Menu;
