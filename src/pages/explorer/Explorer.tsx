import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { useAppSelector } from "../../hooks/use-app-selector";
import Notification from "../../data/interfaces/notification";
import Search from "./search/Search";
import { includesString, sortArrayByDateStringField, sortArrayByStringField } from "../../utils/helpers";
import { formatDate } from "../../utils/formatters";
import { getUserLogin } from "../../services/auth-service";

import "./Explorer.scss";

export const Explorer: React.FC = () => {
  const notifications: Notification[] = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const filters = useAppSelector((state) => state.filters);
  const [filterNotifications, setFilterNotifications] = useState(
    [] as Notification[]
  );
  const [userLogin, setUserLogin] = useState<string>();

  useEffect(() => {
    (async () => {
      const login = await getUserLogin();
      setUserLogin(login);
    })();
  }, []);

  useEffect(() => {
    setFilterNotifications(filterAndSortNotifications(notifications));
  }, [notifications, filters, userLogin]);

  const filterAndSortNotifications = (notifications: Notification[]) => {
    let filterNotifications = notifications
      .filter(
        (n) =>
          includesString(n.title, filters.searchFilter) ||
          includesString(n.subtitle, filters.searchFilter) ||
          includesString(n.description, filters.searchFilter) ||
          includesString(n.owner.login, filters.searchFilter) ||
          includesString(formatDate(n.date), filters.searchFilter)
      )
      .filter((n) => n.category === filters.selectedCategory)
      .filter((n) => n.status === filters.selectedStatus)
      .filter((n) => filters.showDelegations || n.owner.login === userLogin)
      .filter((n) =>
        !filters.selectedApplication ||
        filters.selectedApplication
          .toLowerCase()
          .split(",")
          .includes(n.title.trim().toLocaleLowerCase())
      );

      // sort the notifications to be displayed in the Table
      if(filters.sortFilter.field === "date"){
        filterNotifications = sortArrayByDateStringField(filterNotifications, filters.sortFilter.field, filters.sortFilter.asc);
      }else{
        filterNotifications = sortArrayByStringField(filterNotifications, filters.sortFilter.field, filters.sortFilter.asc);
      }
      
      return filterNotifications;
  };

  return (
    <>
      <Search />
      {userLogin && <Table notifications={filterNotifications} />}
      {!userLogin && <p>Loading ...</p>}
    </>
  );
};

export default Explorer;
