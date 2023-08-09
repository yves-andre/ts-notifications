import React from 'react'
import { BEM } from '@trading/energies-ui'
import styles from './Error.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const Error = ({ variable, value }) => {
  const message =
    value === undefined
      ? 'is not found'
      : value?.length === 0
        ? 'is empty'
        : 'has an error'
  return (
    <div className={b()}>
      <span className={b('variable')}>{variable}</span> {message}
    </div>
  )
}

export default Error
