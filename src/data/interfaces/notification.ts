export default interface Notification {
  owner: Owner;
  methods: Methods;
  category: number;
  description: string;
  date: string;
  status: number;
  isRead: boolean;
  isSeen?: boolean;
  isImportant?: boolean;
  isFavorite: boolean;
  _id: string;
  title: string;
  sourceUrl: string;
  actions: Action[];
  __v: number;
  subtitle: string;
  details: string;
  isReminder?: boolean;
  isManual?: boolean;
  image: string;
  reference: string;
  sourceName: string;
  isDelegate: boolean;
  delegates: string[];
  treatedBy: string;
  treatedOn: string;
}

interface Owner {
  login: string;
}

interface Methods {
  getAllUserNotifications: string;
  getUserNotificationsByStatus: string;
  countNewUserNotificationsByCategory: string;
  postNotifications: string;
  updateUserNotificationStatus: string;
  getNotificationsByReference: string;
}

interface Action {
  isDefault: boolean;
  _id: string;
  name: string;
  url: string;
}
