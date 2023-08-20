import React from "react";

import Application from "../../data/interfaces/application";
import CategoryColor from "../../data/interfaces/category-color";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { CATEGORY } from "../../data/constants/category";
import { NotificationCount } from "../../data/interfaces/notification-count";
import { filtersActions } from "../../store/filters-slice";


import { Nav } from '@trading/energies-ui'

import "./Sidebar.scss";
import {getNotificationsCountByCategory} from "../menu/menu-service";
import {useLocation, useNavigate} from "react-router-dom";

/*----------------------------------------------------------------------------*/

interface ISidebarProps {
  applications: Application[];
  categoryColors: CategoryColor[];
}

/*----------------------------------------------------------------------------*/
const ACTION_FEED = CATEGORY.ACTION_FEED;

export const Sidebar: React.FC<ISidebarProps> = ({ applications, categoryColors }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const selectedApplication = useAppSelector(
    (state) => state.filters.selectedApplication
  );

  const dispatch = useAppDispatch();


  const getAppsByCategory = (category: number): Application[] => {
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return applications?.filter((app) => app.type === filterValue);
  };

  const getNotificationCount = (application: Application, category: number) => {
    if (!notifications) return 0;
    return notifications
      .filter((n) => n.status === 1)
      .filter(
        (n) =>
          application.match
            .split(",")
            .map((a) => a.trim())
            .includes(n.sourceName.trim().toLowerCase()) &&
          n.category === category
      ).length;
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
        return 'Action Feed';
      case CATEGORY.INFORMATION_FEED:
        return 'Information Feed';
      default:
        return '';
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
  const notificationCounts: NotificationCount[] = useAppSelector(
    (state) => state.notifications.notificationCounts
  );


  const getNotificationCountByCategory = (category: number): number | null => {
    return getNotificationsCountByCategory(category, notificationCounts);
  };



  const subnavCategories = ([{
    key: selectedCategory,
    title: 'ALL ' + getTitleByCategory(selectedCategory),
    icon: getIconByCategory(selectedCategory),
    badge: getNotificationCountByCategory(selectedCategory) || undefined,
    color: getColorByCategory(selectedCategory)
  },
  ...getAppsByCategory(selectedCategory).map((app, i) => ({
    key: `${app.sourceName}_${app.type}`,
    title: app.title,
    icon: app.image,
    badge: getNotificationCount(app, selectedCategory) || undefined,
    color: getColorByCategory(selectedCategory)
  })
  )]);




  const handleClick = (item: any) => {
    if (item.key === selectedCategory) {
      selectCategoryHandler(item.key)
    } else {
      const app = getAppsByCategory(selectedCategory).find(app => item.key === `${app.sourceName}_${app.type}`)
      if (app?.match) {
        selectAppHandler(app?.match, selectedCategory)
      }
    }
    navigate({pathname: `/explorer`, search: location.search})

  }


  return (
    <>
      <Nav
        variant='secondary'
        items={subnavCategories}
        active={getActiveNavItem()}
        onClick={(item: any) => handleClick(item)}
      />
    </>
  );
};

export default Sidebar;
