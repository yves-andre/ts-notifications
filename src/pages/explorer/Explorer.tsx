import React, { useEffect, useState } from "react";
import Table from "./table/Table";
import { useAppSelector } from "../../hooks/use-app-selector";
import Notification from "../../data/interfaces/notification";
import Search from "./search/Search";
import {
  includesString,
  sortArrayByDateStringField,
  sortArrayByStringAndDate,
  sortArrayByStringField,
} from "../../utils/helpers";
import { formatDate } from "../../utils/formatters";

import { Placeholder } from "@trading/energies-ui";

import "./Explorer.scss";
import { getUserLogin } from "../../services/auth-service";

export const Explorer: React.FC = () => {
  const notifications: Notification[] = useAppSelector(
    (state) => state.notifications.notificationItems
  );
  const filters = useAppSelector((state) => state.filters);
  const [filterNotifications, setFilterNotifications] = useState(
    [] as Notification[]
  );

  useEffect(() => {
    const fetchUserLogin = async () => {
      return await getUserLogin();
    }
    fetchUserLogin().then((login) => {
      setFilterNotifications(filterAndSortNotifications(notifications, login));
    })
  }, [notifications, filters]);

  const filterAndSortNotifications = (notifications: Notification[], userLogin: string) => {
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
      // filter by selected application
      .filter(
        (n) =>
          !filters.selectedApplication ||
          filters.selectedApplication
            .toLowerCase()
            .split(',')
            .map(a => a.trim())
            .includes(n.sourceName.trim().toLocaleLowerCase())
      );

    //hide delegations if showDelegations is false
    if(filters.showDelegations.value === false){
      filterNotifications = filterNotifications.filter(
        (n) => !(n.owner.login !== userLogin && n.delegates.includes(userLogin))
      );
    }
    // sort the notifications to be displayed in the Table
    if (filters.sortFilter.field === "date") {
      filterNotifications = sortArrayByDateStringField(
        filterNotifications,
        filters.sortFilter.field,
        filters.sortFilter.asc
      );
    } else {
      filterNotifications = sortArrayByStringField(
        filterNotifications,
        filters.sortFilter.field,
        filters.sortFilter.asc
      );
    }


    if(filters.sortFilter.field === "title"){
      filterNotifications = sortArrayByStringAndDate(
        filterNotifications,
        filters.sortFilter.field,
        "date",
        filters.sortFilter.asc
      );
    }
    return filterNotifications;
  };

  return (
    <div className="Explorer">
      <Search />
      {filterNotifications.length > 0 ? (
        <Table notifications={filterNotifications} />
      ) : (
        <Placeholder
          title="You don't have any notification."
          image="emptyBox"
          theme="dark"
          color={true}
          style={{ minHeight: 0 }}
        />
      )}
    </div>
  );
};

export default Explorer;
