import { httpGet } from "./_http-client";
export const getNotifications = async () => {
  const notifications = await httpGet(
    "http://dwpnotifier-dev.dts.corp.local/notifications/",
    { credentials: "include" }
  );
  return notifications;
};
