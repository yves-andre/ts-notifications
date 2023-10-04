import React, { useState, useEffect } from "react";

import Application from "../../data/interfaces/application";
import CategoryColor from "../../data/interfaces/category-color";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { CATEGORY } from "../../data/constants/category";
import { NotificationCount } from "../../data/interfaces/notification-count";
import { filtersActions } from "../../store/filters-slice";

import { Nav } from "@trading/energies-ui";

import "./Sidebar.scss";
import {
  getAllNotificationsCount,
  getNotificationCategorycount,
} from "../menu/menu-service";
import { useLocation, useNavigate } from "react-router-dom";
import { STATUS } from "../../data/constants/status";
import { fetchNotificationsByStatusAndCategory, getNotificationItemsByCategoryAndStatus } from "../../store/notifications-slice";
import { useSelector } from "react-redux";
import { useNavigateToExplorer } from "../../hooks/use-navigate-to-explorer";

/*----------------------------------------------------------------------------*/

interface ISidebarProps {
  applications: Application[];
  categoryColors: CategoryColor[];
}

/*----------------------------------------------------------------------------*/
const ACTION_FEED = CATEGORY.ACTION_FEED;

export const Sidebar: React.FC<ISidebarProps> = ({
  applications,
  categoryColors,
}) => {
  const [navItems, setNavItems] = useState<any>([]);
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const selectedStatus = useAppSelector(
    (state) => state.filters.selectedStatus
  );
  const selectedApplication = useAppSelector(
    (state) => state.filters.selectedApplication
  );
  const notificationCounts: NotificationCount[] = useAppSelector(
    (state) => state.notifications.notificationCounts
  );
  const toBeTreated = useSelector((state) => getNotificationItemsByCategoryAndStatus(state, selectedCategory, STATUS.TO_BE_TREATED));

  useEffect(() => {
    (async () => {
      const navItems = await getSubnavCategories();
      setNavItems(navItems);
    })()
  }, [toBeTreated, notificationCounts]);

  const dispatch = useAppDispatch();
  const { navigateToExplorer } = useNavigateToExplorer();

  const getAppsByCategory = (category: number): Application[] => {
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return applications?.filter((app) => app.type === filterValue);
  };

  // We can replace this logic with a simple API call to fetch the category counts when ready.
  const getNotificationCount = async (
    category: number,
    application?: Application,
  ) => {
    // check if wee need the notifications of status 1 corresponding to the current category in order to calculate the count
    if (
      selectedStatus === STATUS.TREATED
    ) {
      await dispatch(fetchNotificationsByStatusAndCategory(STATUS.TO_BE_TREATED, selectedCategory));
    }

    if (application) {
      return getNotificationCategorycount(category, toBeTreated.items, application);
    }

    return getAllNotificationsCount(category, notificationCounts);
  };

  const getColorByCategory = (category: number): string | undefined => {
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return categoryColors.find((c) => c.title === filterValue)?.color;
  };

  const selectCategoryHandler = (category: number): void => {
    dispatch(filtersActions.setSelectedCategory(category));
    dispatch(filtersActions.setSelectedApplication(""));
  };
  const selectAppHandler = (match: string, category: number) => {
    dispatch(filtersActions.setSelectedCategory(selectedCategory));
    dispatch(filtersActions.setSelectedApplication(match));
  };

  const getActiveNavItem = () => {
    if (selectedApplication) {
      const filterValue =
        selectedCategory === ACTION_FEED ? "workflow" : "socialflow";
      return `${applications.find((app) => app.match === selectedApplication)
          ?.sourceName
        }_${applications.find((app) => app.type === filterValue)?.type}`;
    }
    return selectedCategory;
  };

  const getTitleByCategory = (category: number): string => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "Action Feed";
      case CATEGORY.INFORMATION_FEED:
        return "Information Feed";
      default:
        return "";
    }
  };

  const getIconByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "roundSuccess";
      case CATEGORY.INFORMATION_FEED:
        return "bellFeed";
      default:
        return undefined;
    }
  };

  const getSubnavCategories = async () => {
    // Get the badge count for the selected category, or set it to undefined if no count is returned
    const badge = await getNotificationCount(selectedCategory) || undefined;
    // Map over the apps in the selected category, returning an array of Promises representing each app's details
    const appPromises = getAppsByCategory(selectedCategory).map(async (app) => ({
      key: `${app.sourceName}_${app.type}`,
      title: app.title,
      icon: app.image,
      // Get the notification count for each app, or set it to undefined if no count is returned
      badge: await getNotificationCount(selectedCategory, app) || undefined,
      color: getColorByCategory(selectedCategory),
    }));

    // Wait for all the promises in appPromises to be resolved, returning an array with each app's details
    const appCategories = await Promise.all(appPromises);

    // Combine the category details with the app details and return the result
    return [
      {
        key: selectedCategory,
        title: "All Apps",
        icon: getIconByCategory(selectedCategory),
        badge, // the badge count from earlier
        color: getColorByCategory(selectedCategory),
      },
      // Spread the resolved app details into the final array
      ...appCategories,
    ];
  };

  const handleClick = (item: any) => {
    if (item.key === selectedCategory) {
      selectCategoryHandler(item.key);
    } else {
      const app = getAppsByCategory(selectedCategory).find(
        (app) => item.key === `${app.sourceName}_${app.type}`
      );
      if (app?.match) {
        selectAppHandler(app?.match, selectedCategory);
      }
    }
    navigateToExplorer();
  };

  return (
    <>
      <Nav
        variant="secondary"
        items={navItems}
        active={getActiveNavItem()}
        onClick={(item: any) => handleClick(item)}
      />
    </>
  );
};

export default Sidebar;
