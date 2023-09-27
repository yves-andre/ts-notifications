import React from 'react'

import { Icon, BEM, colorCSS } from '@trading/energies-ui'

import styles from './Alert.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const Alert = ({ color, icon, onClose, children }) => {
  return (
    <div className={b()} style={{ color: colorCSS(color) }}>
      <Icon className={b('icon')} name={icon} size='large' />
      {children}
      {onClose && (
        <Icon className={b('close')} name='closeMedium' onClick={onClose} />
      )}
    </div>
  )
}

export default Alert
