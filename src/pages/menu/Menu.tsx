import React from "react";
import { CATEGORY, CATEGORY_NAME} from "../../data/constants/category";
import Application from "../../data/interfaces/application";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { filtersActions } from "../../store/filters-slice";
import { Nav, ThemeColor } from "@trading/energies-ui";
import CategoryColor from "../../data/interfaces/category-color";

import { getNotificationsCountByCategory, getTitleByCategory } from "./menu-service";

import "./Menu.scss";
import { NotificationCount } from "../../data/interfaces/notification-count";
import {useNavigate, useParams} from "react-router-dom";

interface Props {
  applications: Application[];
  categoryColors: CategoryColor[];
}

const ACTION_FEED = CATEGORY.ACTION_FEED;
const INFORMATION_FEED = CATEGORY.INFORMATION_FEED;
const CATEGORIES = [ACTION_FEED, INFORMATION_FEED];

export const Menu: React.FC<Props> = ({ applications, categoryColors }) => {
  const navigate = useNavigate()
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const notificationCounts: NotificationCount[] = useAppSelector(
    (state) => state.notifications.notificationCounts
  );

  const dispatch = useAppDispatch();

  const getNotificationCountByCategory = (category: number): number | null => {
   return getNotificationsCountByCategory(category, notificationCounts);
  };

  const selectCategoryHandler = (category: number): void => {
    dispatch(filtersActions.setSelectedCategory(category));
    dispatch(filtersActions.setSelectedApplication(""));
    navigate({pathname: `/explorer`, search: location.search})
  };


  const getIconByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "filled/check-circle";
      case CATEGORY.INFORMATION_FEED:
        return "filled/bell-on";
      default:
        return undefined;
    }
  };

  const getColorByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "corporate/aqua";
      case CATEGORY.INFORMATION_FEED:
        return "secondary/orange";
      default:
        return undefined;
    }

  };

  const getGradientByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "corporate/aqua";
      case CATEGORY.INFORMATION_FEED:
        return "secondary/orange1";
      default:
        return undefined;
    }
  };


  const navCategories = CATEGORIES.map((category) => ({
    key: category,
    color: getColorByCategory(category),
    icon: getIconByCategory(category),
    title: getTitleByCategory(category),
    badge: getNotificationCountByCategory(category) || undefined,
    selected: selectedCategory === category
  }));

  return (
    <>
      {navCategories && (
        <>
          <ThemeColor
            color={getColorByCategory(selectedCategory) || ''}
            gradient={getGradientByCategory(selectedCategory) || ''}
          />
          <Nav
            onClick={(item: any) => selectCategoryHandler(item.key)}
            active={selectedCategory}
            items={navCategories}
            variant='local'
            tooltip={{ placement: 'right' }}
          />
        </>
      )}
    </>
  );
};

export default Menu;
