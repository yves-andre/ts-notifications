import React, { useEffect, useState } from 'react'
import Table from './table/Table'
import { useAppSelector } from '../../hooks/use-app-selector'
import Notification from '../../data/interfaces/notification'
import Search from './search/Search'
import {
  getUTCWeek,
  includesString,
  sortArrayByDateStringField,
  sortArrayByStringAndDate,
  sortArrayByStringField,
} from '../../utils/helpers'
import { formatDate } from '../../utils/formatters'

import { Placeholder } from '@trading/energies-ui'

import './Explorer.scss'
import { getUserLogin } from '../../services/auth-service'

import NotificationGroup from '../../data/interfaces/notification-group'
import { STATUS } from '../../data/constants/status'

const notificationPeriodGroups = [
  {
    key: 'TODAY',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return (
        currentDate.getFullYear() === notificationDate.getFullYear() &&
        currentDate.getMonth() === notificationDate.getMonth() &&
        currentDate.getDate() === notificationDate.getDate()
      )
    },
  },
  {
    key: 'YESTERDAY',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return (
        currentDate.getFullYear() === notificationDate.getFullYear() &&
        currentDate.getMonth() === notificationDate.getMonth() &&
        currentDate.getDate() - 1 === notificationDate.getDate()
      )
    },
  },
  {
    key: 'THIS WEEK',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return (
        currentDate.getDay() !== 1 &&
        currentDate.getFullYear() === notificationDate.getFullYear() &&
        getUTCWeek(currentDate) === getUTCWeek(notificationDate)
      )
    },
  },
  {
    key: 'LAST WEEK',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return (
        currentDate.getFullYear() === notificationDate.getFullYear() &&
        currentDate.getMonth() === notificationDate.getMonth() &&
        getUTCWeek(currentDate) === getUTCWeek(notificationDate) + 1
      )
    },
  },
  {
    key: 'THIS MONTH',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return (
        currentDate.getFullYear() === notificationDate.getFullYear() &&
        currentDate.getMonth() === notificationDate.getMonth()
      )
    },
  },
  {
    key: 'PREVIOUS',
    isInGroup: (currentDate: Date, notificationDate: Date) => {
      return true
    },
  },
]

export const Explorer: React.FC = () => {
  const notifications: Notification[] = useAppSelector(
    (state) => state.notifications.notificationItems
  )
  const filters = useAppSelector((state) => state.filters)
  const [filterNotifications, setFilterNotifications] = useState(
    [] as NotificationGroup[]
  )

  useEffect(() => {
    const fetchUserLogin = async () => {
      return await getUserLogin()
    }
    fetchUserLogin().then((login) => {
      setFilterNotifications(filterAndSortNotifications(notifications, login))
    })
  }, [notifications, filters])

  const filterAndSortNotifications = (
    notifications: Notification[],
    userLogin: string
  ) => {
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
      .filter((n) => {
        if(filters.selectedStatus === STATUS.TO_BE_TREATED){
          return n.status === STATUS.NEW  || n.status === STATUS.TO_BE_TREATED
        }else{
          return n.status === filters.selectedStatus;
        }
      })
      // filter by selected application
      .filter(
        (n) =>
          !filters.selectedApplication ||
          filters.selectedApplication
            .toLowerCase()
            .split(',')
            .map((a) => a.trim())
            .includes(n.sourceName.trim().toLocaleLowerCase())
      )

    //hide delegations if showDelegations is false
    if (filters.showDelegations === false) {
      filterNotifications = filterNotifications.filter(n => !n.isDelegate)
    }
    // sort the notifications to be displayed in the Table
    if (filters.sortFilter.field === 'date') {
      filterNotifications = sortArrayByDateStringField(
        filterNotifications,
        filters.sortFilter.field,
        filters.sortFilter.asc
      )
    } else {
      filterNotifications = sortArrayByStringField(
        filterNotifications,
        filters.sortFilter.field,
        filters.sortFilter.asc
      )
    }

    if (filters.sortFilter.field === 'title') {
      filterNotifications = sortArrayByStringAndDate(
        filterNotifications,
        filters.sortFilter.field,
        'date',
        filters.sortFilter.asc
      )
    }

    return groupNotifications(filterNotifications)
  }

  const groupNotifications = (notifications: Notification[]) => {
    if (notifications.length <= 0) return []

    const groupedNotifications: NotificationGroup[] = []

    let addedNotificationIds = new Set()

    // start by adding the IMPORTANT notifications to the groups
    const importantNotifications = notifications.filter((n) => n.isImportant)
    importantNotifications.forEach((notification: Notification) => {
      if (notification.isImportant) {
        addNotificationToGroup('IMPORTANT', notification)
        addedNotificationIds.add(notification._id)
      }
    })

    // If we filter by date, then show notifications grouped by period,
    // if we filter by anything else, simple add all not important notifications
    // to a "OTHER" group
    if (filters.sortFilter.field === 'date') {
      // add each notification to the corresponding period group
      notifications.forEach((notification: Notification) => {
        let notificationDate = new Date(notification.date)

        notificationPeriodGroups.map((group) => {
          if (
            !addedNotificationIds.has(notification._id) &&
            group.isInGroup(new Date(), notificationDate)
          ) {
            addNotificationToGroup(group.key, notification)
            addedNotificationIds.add(notification._id)
          }
        })
      })
    } else {
      notifications.forEach((notification: Notification) => {
        addNotificationToGroup('OTHERS', notification)
      })
    }

    function addNotificationToGroup(
      groupName: string,
      notification: Notification
    ) {
      let group = groupedNotifications.find((g: any) => g.name === groupName)

      if (!group) {
        group = {
          name: groupName,
          notifications: [],
        }
        groupedNotifications.push(group)
      }
      group.notifications.push(notification)
    }

    return groupedNotifications
  }

  return (
    <div className='Explorer'>
      <Search />
      {filterNotifications.length > 0 ? (
        <Table notificationGroups={filterNotifications} />
      ) : (
        <Placeholder
          title="You don't have any notification."
          image='emptyBox'
          theme='dark'
          color={true}
          style={{ minHeight: 0 }}
        />
      )}
    </div>
  )
}

export default Explorer
