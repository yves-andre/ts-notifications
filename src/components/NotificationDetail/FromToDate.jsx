import React from 'react'
import dayjs from 'dayjs'

import { BEM } from '@trading/energies-ui'
import { Block } from './'

import styles from './FromToDate.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "fromToDate",
  "labelFrom": "From",
  "labelTo": "To",
  "dateFormat": "DD MMM YYYY",
  "fromDate": "{{absence.startDate}}",
  "toDate": "{{absence.endDate}}"
}
*/
/*----------------------------------------------------------------------------*/
export const FromToDate = ({
  labelFrom,
  labelTo,
  dateFormat,
  fromDate,
  toDate,
  type,
}) => {
  const from = dayjs(fromDate).format(dateFormat)
  const to = dayjs(toDate).format(dateFormat)
  return (
    <div className={b()} data-type={type}>
      <Block
        type='date'
        className={b('from')}
        label={labelFrom}
        value={dayjs(from).isValid() ? from : fromDate}
      />
      <Block
        type='date'
        className={b('to')}
        label={labelTo}
        value={dayjs(to).isValid() ? to : toDate}
      />
    </div>
  )
}

export default FromToDate
