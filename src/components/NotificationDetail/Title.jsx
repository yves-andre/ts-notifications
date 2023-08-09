import React from 'react'
import { BEM } from '@trading/energies-ui'
import styles from './Title.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "title",
  "title": "{{item.Title}}"
}
*/
/*----------------------------------------------------------------------------*/
export const Title = ({ type, children, title }) => {
  return (
    <div className={b()} data-type={type}>
      {title || children}
    </div>
  )
}

export default Title
