import { httpGet } from "./_http-client";
export const getNotifications = async () => {
  const notifications = await httpGet(
    process.env.REACT_APP_API_NOTIFICATIONS_URL as string,
    { credentials: "include" }
  );
  return notifications;
};
