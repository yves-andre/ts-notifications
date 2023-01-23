import Notification from "./notification";

export default interface NotificationGroup {
  name: string;
  notifications: Notification[]
}