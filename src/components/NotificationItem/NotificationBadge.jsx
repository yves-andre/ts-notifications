import React from 'react'
import { STATUS } from '../../data/constants/status'

import { Picture, Tooltip, BEM } from '@trading/energies-ui'
import styles from './NotificationBadge.module.scss'
import { CATEGORY } from "../../data/constants/category";
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const NotificationBadge = ({
  status,
  pendingStatus,
  hasValidationForm,
  isManual,
  active,
  category,
  onClick = (e) => { }
}) => {
  const data = {
    [STATUS.TO_BE_TREATED]: {
      icon: hasValidationForm ? 'arrowRight' : isManual ? 'filled/check' : 'filled/arrow-export',
      color: 'corporate/aqua',
      variant: 'pastel',
      round: true,
      size: 'small',
      tooltip: hasValidationForm ? 'Validate' : isManual ? 'Mark as Treated' : 'Open to Treat',
      active: active
    },
    'PENDING': {
      icon: 'outline/hourglass',
      color: 'secondary/orange',
      variant: 'pastel',
      round: true,
      size: 'small',
      tooltip: 'Validation in Progress'
    },
    [STATUS.TREATED]: {
      icon: 'filled/check-circle',
      color: 'corporate/green',
      size: 'large',
      tooltip: 'Treated'
    },
    'ERROR': {
      icon: 'filled/exclamation-circle',
      color: 'corporate/red',
      size: 'large',
      tooltip: 'Validation Error'
    },
    'DISMISS': {
      icon: 'close24-mini',
      color: 'corporate/pearl',
      variant: 'pastel',
      round: true,
      tooltip: 'Clear'
    }
  }

  const getStatus = () => {
    if (category === CATEGORY.INFORMATION_FEED) {
      return 'DISMISS'
    }
    if (pendingStatus.isPending) {
      return 'PENDING'
    }
    if (pendingStatus.isTimeout) {
      return 'ERROR'
    }
    return status
  }

  return (
    <div className={b()}>
      <Tooltip title={data[getStatus()].tooltip}>
        <Picture onClick={(e) => { onClick(e) }} className={b('icon')} {...data[getStatus()]} />
      </Tooltip>
    </div>
  )
}

export default NotificationBadge
