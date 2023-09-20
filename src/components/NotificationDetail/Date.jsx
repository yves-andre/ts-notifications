import React from 'react'
import { Icon, BEM } from '@trading/energies-ui'

import styles from './Date.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
 {
  "type": "date",
  "label": "Date",
  "value": "{{item.date}}"
}
*/
/*----------------------------------------------------------------------------*/
export const Date = ({ type, label, value, className }) => {
  return (
    <div className={b({}, [], className)} data-type={type}>
      <Icon className={b('icon')} name='filled/calendar' />
      <div className={b('content')}>
        <span className={b('label')}>{label}</span>
        <time className={b('value')}>{value}</time>
      </div>
    </div>
  )
}

export default Date
