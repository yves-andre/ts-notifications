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
  subtitle,
  isImportant,
  details,
  description,
  date,
  onClick,
  active,
  status,
  color
}) => {
  const theme = setTheme(color)
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
          <span className={b('title')}>{title?.toLowerCase()}</span>
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
        {status && <NotificationBadge status={status} />}
      </td>
    </tr>
  )
}

export default NotificationItem
