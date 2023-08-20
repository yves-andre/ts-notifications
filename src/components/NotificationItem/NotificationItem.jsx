import React from 'react'
import { STATUS } from '../NotificationDetail/_status.constant'

import { NotificationBadge } from './'

import { Icon, Status, BEM, setTheme } from '@trading/energies-ui'

import styles from './NotificationItem.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const NotificationItem = ({
  isRead,
  image,
  sourceName,
  title,
  category,
  subtitle,
  isImportant,
  details,
  description,
  pendingStatus,
  date,
  onClick,
  onBadgeClick,
  active,
  status,
  color,
  forceRender
}) => {
  const theme = setTheme(color)

  const onBadgeClickHandler = (e) => {
    if (onBadgeClick) {
      e.stopPropagation()
      onBadgeClick()
    }
  }

  return (
    <tr
      className={b({
        hasClick: onClick,
        isActive: active,
        isError: status === STATUS.ERROR,
        isUnread: !isRead,
      })}
      onClick={onClick}
      style={theme}
    >
      <td>
        <Status
          className={b('status')}
          variant='badgePastel'
          color={color}
        >
          <Icon name={image} size='xs' />
          <span className={b('title')}>{title}</span>
        </Status>
      </td>
      <td>
        <div className={b('subject')}>
          <span className={b('subtitle')}>
            {isImportant && (
              <Icon
                className={b('important')}
                name='exclamationPoint'
                size='xs'
                color='red'
              />
            )}
            {subtitle}
          </span>
          {description && <div className={b('desc')}>{description}</div>}
        </div>
      </td>
      <td>{details}</td>
      <td>{date}</td>
      <td align='right'>
        {<NotificationBadge onClick={(e) => onBadgeClickHandler(e)} category={category} status={status} pendingStatus={pendingStatus} />}
      </td>
    </tr>
  )
}

export default NotificationItem
