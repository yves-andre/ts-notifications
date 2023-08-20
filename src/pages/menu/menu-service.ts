import {CATEGORY, CATEGORY_NAME} from "../../data/constants/category";

export const getNotificationsCountByCategory = (category: number, notificationCounts: any[]): number | null => {
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

export const getTitleByCategory = (category: number): string => {
  switch (category) {
    case CATEGORY.ACTION_FEED:
      return CATEGORY_NAME.ACTION_FEED;
    case CATEGORY.INFORMATION_FEED:
      return CATEGORY_NAME.INFORMATION_FEED;
    default:
      return '';
  }
};
