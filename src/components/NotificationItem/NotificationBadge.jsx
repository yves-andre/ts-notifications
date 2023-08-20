import React from 'react'
import { STATUS } from '../../data/constants/status'

import { Picture, BEM } from '@trading/energies-ui'
import styles from './NotificationBadge.module.scss'
import {CATEGORY} from "../../data/constants/category";
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const NotificationBadge = ({ status, pendingStatus, category, onClick = (e) =>{} }) => {
  const data = {
    [STATUS.TO_BE_TREATED]: {
      icon: 'filled/check',
      color: 'corporate/aqua',
      variant: 'pastel',
      round: true,
      size: 'small',
    },
    'PENDING': {
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
    'ERROR': {
      icon: 'filled/exclamation-circle',
      color: 'corporate/red',
      size: 'large',
    },
    'DISMISS': {
      icon: 'close',
      color: 'dark',
      round: true,
      size: 'small',
    }
  }

  const getStatus = () => {
    if(category === CATEGORY.INFORMATION_FEED ) {
      return 'DISMISS'
    }
    if (pendingStatus.isPending) {
      return 'PENDING'
    }
    if(pendingStatus.isTimeout) {
      return 'ERROR'
    }
    return status
  }

  return <Picture onClick={(e) => {onClick(e)}} className={b()} {...data[getStatus()]} />
}

export default NotificationBadge
