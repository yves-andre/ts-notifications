import React, { useEffect } from 'react'
import {
  Button,
  Picture,
  Icon,
  Text,
  Status,
  Table as TableUI,
  Tooltip,
} from '@trading/energies-ui'
import Notification from '../../../data/interfaces/notification'
import { formatDate } from '../../../utils/formatters'
import { useAppSelector } from '../../../hooks/use-app-selector'
import { useAppDispatch } from '../../../hooks/use-app-dispatch'
import { filtersActions } from '../../../store/filters-slice'
import {
  dismissNotificationById,
  dismissNotifications,
  setNotificationIsReadById,
  setNotificationsIsSeenByIds,
} from '../../../store/notifications-slice'
import { CATEGORY } from '../../../data/constants/category'
import { STATUS } from '../../../data/constants/status'
import { APP_CONFIG } from '../../../data/app-config'
import CategoryColor from '../../../data/interfaces/category-color'

import './Table.scss'
import classNames from 'classnames'
import NotificationGroup from '../../../data/interfaces/notification-group'
import { getUserLogin } from "../../../services/auth-service";
import { setNotificationIsSeen } from "../../../services/notification-service";
import { redirect, useNavigate } from 'react-router-dom'

import NotificationItem from './../../../components/NotificationItem'

interface Props {
  notificationGroups: NotificationGroup[]
}

export const Table: React.FC<Props> = ({ notificationGroups }) => {
  const search = useAppSelector((state) => state.filters.searchFilter)
  const sortFilter = useAppSelector((state) => state.filters.sortFilter)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const selectedStatus = useAppSelector((state) => state.filters.selectedStatus)
  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  )
  const applications = useAppSelector(
    (state) => state.applications.applications
  )
  const categoryColors: CategoryColor[] = useAppSelector(
    (state) => state.applications.categoryColors
  )

  useEffect(() => {
    notificationGroups.forEach((notificationGroup: NotificationGroup) => {
      const notificationsToMarkAsSeen = notificationGroup.notifications.filter(
        (notification) =>
          !notification.isSeen
      )
      if (notificationsToMarkAsSeen.length) {
        const notificationsIds = notificationsToMarkAsSeen.map((notification) => {
          return notification._id
        })
        dispatch(setNotificationsIsSeenByIds(notificationsIds))
      }
    })
  }, [notificationGroups])

  const sortColumnHandler = (fieldName: string) => {
    // 1st click on column = order ascending,
    // 2nd click = order descending
    if (sortFilter.field === fieldName) {
      dispatch(
        filtersActions.setSortFilter({ ...sortFilter, asc: !sortFilter.asc })
      )
    } else {
      dispatch(filtersActions.setSortFilter({ field: fieldName, asc: true }))
    }
  }

  const getNotificationDefaultAction = (notification: Notification) => {
    let defaultAction = notification.actions.find((action) => action.isDefault)
    if (!defaultAction && notification.actions.length > 0) {
      defaultAction = notification.actions[0]
    }
    return () => {
      if (defaultAction && defaultAction.url) {
        const actionUrlSplit = defaultAction.url.split('|')
        let actionUrl = actionUrlSplit[actionUrlSplit.length - 1]
        let target = '_blank'
        if (actionUrlSplit.length > 1) {
          target = actionUrlSplit[0]
        }
        if (
          // if the current url is in the notification url, we don't open in a new tab
          actionUrl.toLowerCase().indexOf(window.location.href.toLowerCase()) >
          -1
        ) {
          target = '_self'
        }
        window.open(actionUrl, target, 'noopener,noreferrer')
      }
    }
  }

  const openNotificationHandler = (notification: Notification) => {
    console.log(notification)
    if (notification.hasValidationForm && notification.validationFormUrl) {
      const resp = navigate(`/validation/${notification._id}`)
      console.log(resp);
    } else {
      const action = getNotificationDefaultAction(notification)
      action && action.call(this)
    }

    //window.open(notification.sourceUrl, "_blank", "noopener,noreferrer");
    !notification.isRead &&
      dispatch(setNotificationIsReadById(notification._id))
  }

  const dismissNotificationHandler = (notification: Notification) => {
    dispatch(dismissNotificationById(notification._id))
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
    align?: 'center' | 'right' | 'justify' | 'char'
    start?: boolean
    end?: boolean
    style?: React.CSSProperties
  }> = ({ field, children, align, start, end, style }) => {
    const borderRadius = {
      borderBottomLeftRadius: start ? '0px' : undefined,
      borderBottomRightRadius: end ? '0px' : undefined,
    }

    return (
      <td
        onClick={() => sortColumnHandler(field)}
        style={{ cursor: 'pointer', ...borderRadius, ...style }}
        align={align}
      >
        <Text variant='current'>{children}</Text>&nbsp;
        <SortIcon field={field} />
      </td>
    )
  }

  const getColorApplication = (sourceName: string) => {
    const applicationColor = applications.find((application) =>
      application.match
        .trim()
        .toLowerCase()
        .split(',')
        .map((a) => a.trim())
        .includes(sourceName.trim().toLowerCase())
    )?.txtColor
    return applicationColor || APP_CONFIG.DEFAULT_APPLICATION_COLOR
  }

  const getColorIsReadStatus = (sourceName: string) => {
    const applicationColor = getColorApplication(sourceName)
    if (applicationColor === APP_CONFIG.DEFAULT_APPLICATION_COLOR) {
      const filterValue =
        selectedCategory === CATEGORY.ACTION_FEED ? 'workflow' : 'socialflow'
      return categoryColors.find((c) => c.title === filterValue)?.color
    }
    return applicationColor
  }

  const renderActionButtons = (notification: Notification) => {
    switch (notification.category) {
      case CATEGORY.ACTION_FEED:
        if (notification.isManual) {
          return (
            <Tooltip title='Mark as Treated' placement='left'>
              <Button
                size='small'
                icon='tick'
                iconOnly
                color='#161719'
                style={{ borderRadius: '50%' }}
                onClick={() => dismissNotificationHandler(notification)}
              />
            </Tooltip>
          )
        } else {
          return (
            <Tooltip title='Open to Treat' placement='left'>
              <Button
                size='small'
                icon='preview'
                iconOnly
                color='#161719'
                style={{ borderRadius: '50%' }}
                onClick={() => openNotificationHandler(notification)}
              />
            </Tooltip>
          )
        }
      case CATEGORY.INFORMATION_FEED:
        return (
          <Tooltip title='Clear' placement='left'>
            <Button
              size='small'
              icon='close'
              iconOnly
              color='#161719'
              style={{ borderRadius: '50%' }}
              onClick={() => dismissNotificationHandler(notification)}
            />
          </Tooltip>
        )
    }
  }

  const dismissAllHandler = () => {
    notificationGroups.map((notificationGroup) => {
      const notificationsToDismiss = notificationGroup.notifications.filter(
        (notification) =>
          notification.category === CATEGORY.INFORMATION_FEED &&
          notification.status === STATUS.TO_BE_TREATED
      )
      dispatch(dismissNotifications(notificationsToDismiss))
    })
  }

  const getHighlightedText = (text: string | undefined, highlight: string) => {
    if (!text) {
      return <span>{text}</span>
    }

    if (!highlight) return text

    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            className={classNames({
              Highlight: part.toLowerCase() === highlight.toLowerCase(),
            })}
          >
            {part}
          </span>
        ))}{' '}
      </span>
    )
  }

  return (
    <TableUI variant='feed' className='NotificationTable'>
      <thead>
        <tr>
          <TD field='title' start>
            Source
          </TD>
          <TD field='subtitle'>Subject</TD>
          <TD field='details' style={{ width: 250, maxWidth: 250 }}>Details</TD>
          <TD field='date'>
            Date
          </TD>
          {selectedStatus !== STATUS.TREATED &&
            selectedCategory === CATEGORY.ACTION_FEED && (
              <TD field='actions' align='right' end>
                Actions
              </TD>
            )}
          {selectedStatus !== STATUS.TREATED &&
            selectedCategory === CATEGORY.INFORMATION_FEED && (
              <td align='right' width='100'>
                <Button
                  size='small'
                  style={{ borderRadius: '10px' }}
                  onClick={dismissAllHandler}
                  color={APP_CONFIG.DEFAULT_APPLICATION_COLOR}
                >
                  Clear all
                </Button>
              </td>
            )}
        </tr>
      </thead>
      <tbody style={{ color: 'var(--ts-color-neutral-gray)' }}>
        {notificationGroups.map((notificationGroup: NotificationGroup, i: number) => (
          <React.Fragment key={i}>
            {notificationGroups.length > 1 && (
              <tr>
                <th colSpan={5}>{notificationGroup.name}</th>
              </tr>
            )}

            {notificationGroup.notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                isRead={notification.isRead}
                isImportant={notification.isImportant}
                image={notification.image}
                sourceName={notification.sourceName}
                title={getHighlightedText(notification.title, search)}
                subtitle={getHighlightedText(notification.subtitle, search)}
                description={getHighlightedText(notification.description, search)}
                details={
                  <>
                    {
                      notification.details &&
                      <>
                        <span>{notification.details}</span>
                        <br />
                      </>
                    }
                    {selectedStatus === STATUS.TREATED &&
                      notification.treatedBy &&
                      notification.treatedOn &&
                      <span>Marked as treated by  <span style={{ textDecoration: "underline" }}>{getHighlightedText(notification.treatedBy, search)}</span> on {getHighlightedText(notification.treatedOn, search)}</span>
                    }
                  </>
                }
                date={getHighlightedText(formatDate(notification.date), search)}
                onClick={() => openNotificationHandler(notification)}
                status={selectedStatus}
                color={getColorApplication(notification.sourceName)}
                active={false}
              />
            ))}


            {notificationGroup.notifications.map((notification, index) => (
              <tr
                key={index}
                onClick={() => openNotificationHandler(notification)}
              >
                <th style={{ whiteSpace: 'nowrap' }}>
                  {!notification.isRead && (
                    <Status
                      variant='badge'
                      color={getColorIsReadStatus(notification.sourceName)}
                      style={{ marginLeft: -2, marginRight: 6 }}
                    ></Status>
                  )}
                  {notification.image && (
                    <Picture
                      person
                      round
                      color={getColorApplication(notification.sourceName)}
                      size='small'
                      icon={notification.image}
                      style={{
                        marginRight: 10,
                        marginLeft: notification.isRead ? 10 : 0,
                      }}
                    />
                  )}
                  <Text
                    size='small'
                    uppercase
                    light
                    style={{ letterSpacing: '0.065em' }}
                  >
                    <>
                      {search && (
                        <span>
                          {getHighlightedText(notification.title, search)}
                        </span>
                      )}
                      {!search && <span>{notification.title}</span>}
                    </>
                  </Text>
                </th>

                <th>
                  {search && (
                    <span>
                      {getHighlightedText(notification.subtitle, search)}
                    </span>
                  )}
                  {!search && (
                    <span>
                      {notification.isImportant ? (
                        <span className='important-explamation'>! </span>
                      ) : (
                        ''
                      )}
                      {notification.subtitle}
                    </span>
                  )}
                  <br />
                  <Text light>
                    <>
                      {search && (
                        <span>
                          {getHighlightedText(notification.description, search)}
                        </span>
                      )}
                      {!search && <span>{notification.description}</span>}
                    </>
                  </Text>
                </th>

                <th>
                  <Text italic light size='small'>
                    <>
                      {
                        notification.details &&
                        <>
                          <span>{notification.details}</span>
                          <br />
                        </>
                      }
                      {selectedStatus === STATUS.TREATED &&
                        notification.treatedBy &&
                        notification.treatedOn &&
                        search &&
                        <span>Marked as treated by  <span style={{ textDecoration: "underline" }}>{getHighlightedText(notification.treatedBy, search)}</span> on {getHighlightedText(notification.treatedOn, search)}</span>
                      }
                      {selectedStatus === STATUS.TREATED &&
                        notification.treatedBy &&
                        notification.treatedOn &&
                        !search &&
                        <span>Marked as treated by <span style={{ textDecoration: "underline" }}>{notification.treatedBy}</span> on {notification.treatedOn}</span>
                      }
                    </>
                  </Text>
                </th>

                <th>
                  <Text italic light size='small'>
                    <>
                      {search && (
                        <span>
                          {getHighlightedText(
                            formatDate(notification.date),
                            search
                          )}
                        </span>
                      )}
                      {!search && <span>{formatDate(notification.date)}</span>}
                    </>
                  </Text>
                </th>
                {selectedStatus !== STATUS.TREATED && (
                  <th
                    align='right'
                    style={{ paddingRight: 5 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderActionButtons(notification)}
                  </th>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </TableUI>
  )
}

export default Table
