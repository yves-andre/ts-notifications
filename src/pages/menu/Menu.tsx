import React from "react";
import { CATEGORY } from "../../data/constants/category";
import Application from "../../data/interfaces/application";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { useAppSelector } from "../../hooks/use-app-selector";
import { filtersActions } from "../../store/filters-slice";
import { Nav, ThemeColor } from "@trading/energies-ui";
import CategoryColor from "../../data/interfaces/category-color";


import "./Menu.scss";
import { NotificationCount } from "../../data/interfaces/notification-count";

interface Props {
  applications: Application[];
  categoryColors: CategoryColor[];
}

const ACTION_FEED = CATEGORY.ACTION_FEED;
const INFORMATION_FEED = CATEGORY.INFORMATION_FEED;
const CATEGORIES = [ACTION_FEED, INFORMATION_FEED];

export const Menu: React.FC<Props> = ({ applications, categoryColors }) => {

  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );
  const notificationCounts: NotificationCount[] = useAppSelector(
    (state) => state.notifications.notificationCounts
  );

  const dispatch = useAppDispatch();

  const getNotificationCountByCategory = (category: number): number | null => {
    const countResponse = (
      notificationCounts.find(
        (notificationCount) => parseInt(notificationCount.category) === category
      )
    );
    const count = countResponse?.count || 0;
    const pendingCount = countResponse?.pendingCount || 0;
    if (category === 0 && pendingCount <= count) {
      return count - pendingCount;
    }
    return count;
  };

  const selectCategoryHandler = (category: number): void => {
    dispatch(filtersActions.setSelectedCategory(category));
    dispatch(filtersActions.setSelectedApplication(""));
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
        return "filled/check-circle";
      case CATEGORY.INFORMATION_FEED:
        return "filled/bell-on";
      default:
        return undefined;
    }
  };

  const getColorByCategory = (category: number): string | undefined => {
    /*const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return categoryColors.find((c) => c.title === filterValue)?.color;*/

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
