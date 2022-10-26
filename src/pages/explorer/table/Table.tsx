import React from 'react'
import {
  Button,
  Picture,
  Icon,
  Text,
  Table as TableUI,
} from '@trading/energies-ui'
import Notification from '../../../data/interfaces/notification'
import { formatDate } from '../../../utils/formatters'
import Highlight from '../../../components/Highlight/Highlight'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { filtersActions } from '../../../store/filters-slice'
import {
  fetchNotifications,
  notificationActions,
} from '../../../store/notifications-slice'

import './Table.scss'

interface Props {
  notifications: Notification[]
}

export const Table: React.FC<Props> = ({ notifications }) => {
  const search = useAppSelector((state) => state.filters.searchFilter)
  const sortFilter = useAppSelector((state) => state.filters.sortFilter)
  const dispatch = useAppDispatch()

  const sortColumnHandler = (fieldName: string) => {
    // 1st click on column = order ascending,
    // 2nd click = order descending,
    // 3rd click = remove order
    if (sortFilter.field === fieldName) {
      sortFilter.asc
        ? dispatch(filtersActions.setSortFilter({ ...sortFilter, asc: false }))
        : dispatch(filtersActions.setSortFilter({ field: '', asc: true }))
    } else {
      dispatch(filtersActions.setSortFilter({ field: fieldName, asc: true }))
    }
  }

  const openNotificationHandler = (notification: Notification) => {
    window.open(notification.sourceUrl, '_blank', 'noopener,noreferrer')
  }

  const dismissNotificationHandler = (notification: Notification) => {
    alert('DISMISS ' + notification.title)
    //refresh the notifications
    dispatch(fetchNotifications())
  }

  const SortIcon: React.FC<{ field: string }> = ({ field }) => {
    if (sortFilter.field === field) {
      return sortFilter.asc ? (
        <Icon
          name='caretRoundedDown'
          size='small'
          style={{ minWidth: 0, minHeight: 0, width: 15, height: 0 }}
        />
      ) : (
        <Icon
          name='caretRoundedUp'
          size='small'
          style={{ minWidth: 0, minHeight: 0, width: 15, height: 0 }}
        />
      )
    } else {
      return <></>
    }
  }

  const TD: React.FC<{
    field: string
    children: string
    align?: 'center' | 'right' | 'justify' | 'char' | undefined
  }> = ({ field, children, align }) => {
    return (
      <td
        onClick={() => sortColumnHandler(field)}
        style={{ cursor: 'pointer' }}
        align={align}
      >
        <Text variant='current'>{children}</Text>&nbsp;
        <SortIcon field={field} />
      </td>
    )
  }

  return (
    <TableUI variant='feed'>
      <thead>
        <tr>
          <TD field='title'>Source</TD>
          <TD field='subtitle'>Subject</TD>
          <TD field='description'>Description</TD>
          <TD field='details'>Sent to</TD>
          <TD field='date' align='right'>
            Date
          </TD>
          <td align='right' width='230'>
            Actions
          </td>
        </tr>
      </thead>
      <tbody>
        {notifications.map((notification) => (
          <tr key={notification._id}>
            <th>
              {notification.image && (
                <Picture
                  person
                  round
                  size='small'
                  icon={notification.image}
                  style={{ marginRight: 10 }}
                />
              )}
              <Highlight highlight={search}>{notification.title}</Highlight>
            </th>
            <th>
              <Highlight highlight={search}>{notification.subtitle}</Highlight>
            </th>
            <th>
              <Highlight highlight={search}>
                {notification.description}
              </Highlight>
            </th>
            <th>
              <Text color='silver' italic light>
                <Highlight highlight={search}>{notification.details}</Highlight>
              </Text>
            </th>
            <th align='right'>
              <Text color='silver' light>
                <Highlight highlight={search}>
                  {formatDate(notification.date)}
                </Highlight>
              </Text>
            </th>
            <th align='right' style={{ paddingRight: 0 }}>
              <Button onClick={() => openNotificationHandler(notification)}>
                OPEN
              </Button>
              <Button onClick={() => dismissNotificationHandler(notification)}>
                DISMISS
              </Button>
            </th>
          </tr>
        ))}
      </tbody>
    </TableUI>
  )
}

export default Table
