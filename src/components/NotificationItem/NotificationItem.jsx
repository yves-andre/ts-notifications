import React from 'react'
import { STATUS } from '../../status.constant'

import { NotificationBadge } from './'

import { Icon, Status, BEM, setTheme } from '@trading/energies-ui'

import styles from './NotificationItem.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const NotificationItem = ({
  source,
  subject,
  detail,
  date,
  status,
  unread,
  active,
  onClick,
  important,
}) => {
  const theme = setTheme(source.color)
  return (
    <tr
      className={b({
        hasClick: onClick,
        isActive: active,
        isError: status === STATUS.ERROR,
        isUnread: unread,
      })}
      onClick={onClick}
      style={theme}
    >
      <td>
        <Status
          className={b('status')}
          variant='badgePastel'
          color={source.color}
        >
          <Icon name={source.icon} size='xs' />
          {source.title}
        </Status>
      </td>
      <td>
        <div className={b('subject')}>
          <span className={b('title')}>
            {important && (
              <Icon
                className={b('important')}
                name='exclamationPoint'
                size='xs'
                color='red'
              />
            )}
            {subject.title}
          </span>
          {subject.desc && <div className={b('desc')}>{subject.desc}</div>}
        </div>
      </td>
      <td>{detail}</td>
      <td>{date}</td>
      <td align='right'>
        <NotificationBadge status={status} />
      </td>
    </tr>
  )
}

export default NotificationItem
