import { httpGet } from "./_http-client";

export const getNotifications = async () => {
  const notifications = httpGet("notifications.json");
  return notifications;
};