import React from 'react'
import { STATUS } from '../NotificationDetail/_status.constant'

import { Picture, BEM } from '@trading/energies-ui'
import styles from './NotificationBadge.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const NotificationBadge = ({ status }) => {
  const data = {
    [STATUS.TO_BE_TREATED]: {
      icon: 'filled/check',
      color: 'corporate/aqua',
      variant: 'pastel',
      round: true,
      size: 'small',
    },
    [STATUS.IN_PROGRESS]: {
      icon: 'outline/hourglass',
      color: 'secondary/orange',
      variant: 'pastel',
      round: true,
      size: 'small',
    },
    [STATUS.TREATED]: {
      icon: 'filled/check-circle',
      color: 'corporate/green',
      size: 'large',
    },
    [STATUS.ERROR]: {
      icon: 'filled/exclamation-circle',
      color: 'corporate/red',
      size: 'large',
    },
  }
  return <Picture className={b()} {...data[status]} />
}

export default NotificationBadge
