import { CATEGORY, CATEGORY_NAME } from "../../data/constants/category";
import Application from "../../data/interfaces/application";
import Notification from "../../data/interfaces/notification";

export const getAllNotificationsCount = (
  category: number,
  notificationCounts: any[]
): number | null => {
  const countResponse = notificationCounts.find(
    (notificationCount) => parseInt(notificationCount.category) === category
  );
  const count = countResponse?.count || 0;
  const pendingCount = countResponse?.pendingCount || 0;
  if (category === 0 && pendingCount <= count) {
    return count - pendingCount;
  }
  return count;
};

export const getNotificationCategorycount = (
  category: number,
  notifications: Notification[] | null,
  application: Application
): number | null => {
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

export const getTitleByCategory = (category: number): string => {
  switch (category) {
    case CATEGORY.ACTION_FEED:
      return CATEGORY_NAME.ACTION_FEED;
    case CATEGORY.INFORMATION_FEED:
      return CATEGORY_NAME.INFORMATION_FEED;
    default:
      return "";
  }
};
