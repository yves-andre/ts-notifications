import React, { ReactNode, useEffect, useState } from "react";
import { CATEGORY } from "../../../data/constants/category";
import Application from "../../../data/interfaces/application";
import { useAppDispatch } from "../../../hooks/use-app-dispatch";
import { useAppSelector } from "../../../hooks/use-app-selector";
import { filtersActions } from "../../../store/filters-slice";
import { Nav } from "@trading/energies-ui";
import CategoryColor from "../../../data/interfaces/category-color";
import { setNotificationsIsSeen } from "../../../store/notifications-slice";
import { STATUS } from "../../../data/constants/status";

import "./Menu.scss";
import { NotificationCount } from "../../../data/interfaces/notification-count";

interface Props {
  applications: Application[];
  categoryColors: CategoryColor[];
  notificationCounts: NotificationCount[];
}

const ACTION_FEED = CATEGORY.ACTION_FEED;
const INFORMATION_FEED = CATEGORY.INFORMATION_FEED;
const CATEGORIES = [ACTION_FEED, INFORMATION_FEED];

export const Menu: React.FC<Props> = ({
  applications,
  categoryColors,
  notificationCounts,
}) => {
  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );

  const dispatch = useAppDispatch();

  const [nav, setNav] = useState<any>();

  useEffect(() => {
    const navCategories = CATEGORIES.map((category) => ({
      isExpanded: true,
      key: category,
      color: getColorByCategory(category),
      icon: getIconByCategory(category),
      title: getTitleByCategory(category),
      badge: getNotificationCountByCategory(category) || undefined,
      items: getAppsByCategory(category).map((app, i) => ({
        key: app.sourceName,
        title: app.title,
        icon: app.image,
        badge: getNotificationCount(app) || undefined,
        color: getColorByCategory(category),
        onClick: () => selectAppHandler(app.match, category),
      })),
    }));
    setNav(navCategories);
  }, [notifications]);

  useEffect(() => {
    // for the information feed category, we want to set the
    // isSeen attribute to true as soon as the catefory is selected
    selectedCategory === CATEGORY.INFORMATION_FEED &&
      dispatch(setNotificationsIsSeen(selectedCategory));
  }, [selectedCategory]);

  const getAppsByCategory = (category: number): Application[] => {
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return applications?.filter((app) => app.type === filterValue);
  };

  const getNotificationCount = (application: Application) => {
    return notifications
      .filter((n) => n.status === 1)
      .filter(
        (n) =>
        application.match
          .split(",")
          .map((a) => a.trim())
          .includes(n.sourceName.trim().toLowerCase())
      ).length;
  };

  const getNotificationCountByCategory = (category: number): number | null => {
    return (
      notificationCounts.find(
        (notificationCount) => parseInt(notificationCount.category) === category
      )?.count || 0
    );
  };

  const selectCategoryHandler = (category: number): void => {
    dispatch(filtersActions.setSelectedCategory(category));
    dispatch(filtersActions.setSelectedApplication(""));
  };
  const selectAppHandler = (match: string, category: number) => {
    dispatch(filtersActions.setSelectedCategory(category));
    dispatch(filtersActions.setSelectedApplication(match));
  };

  const getTitleByCategory = (category: number): ReactNode => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return (
          <>
            <b>ACTION</b> FEED
          </>
        );
      case CATEGORY.INFORMATION_FEED:
        return (
          <>
            <b>INFORMATION</b> FEED
          </>
        );
      default:
        return <></>;
    }
  };

  const getIconByCategory = (category: number): string | undefined => {
    switch (category) {
      case CATEGORY.ACTION_FEED:
        return "validations";
      case CATEGORY.INFORMATION_FEED:
        return "bellFeed";
      default:
        return undefined;
    }
  };

  const getColorByCategory = (category: number): string | undefined => {
    const filterValue = category === ACTION_FEED ? "workflow" : "socialflow";
    return categoryColors.find((c) => c.title === filterValue)?.color;
  };

  const css = `:root {
    --ts-global-theme: var(--ts-color-${getColorByCategory(selectedCategory)});
    --ts-global-theme-dark: var(--ts-color-${getColorByCategory(
      selectedCategory
    )}-dark);
  }`;

  return (
    <>
      <style>{css}</style>
      {nav && (
        <Nav
          onClick={(item: any) => selectCategoryHandler(item.key)}
          active={selectedCategory}
          items={nav}
          variant="feed"
        />
      )}
    </>
  );
};

export default Menu;
