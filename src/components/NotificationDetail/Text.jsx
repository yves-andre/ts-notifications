import React from 'react'

import { Icon, BEM, colorCSS } from '@trading/energies-ui'

import styles from './Text.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "text",
  "icon": "warning",
  "color": "yellow",
  "title": "Mandatory Check",
  "subtitle": "",
  "text": "You have to check this line if you want to validate this item."
}
*/
/*----------------------------------------------------------------------------*/
export const Text = ({ type, title, subtitle, text, color, icon }) => {
  return (
    <div className={b()} data-type={type}>
      {icon && (
        <Icon className={b('icon')} name={icon} color={color} size='xs' />
      )}
      <div className={b('content')}>
        <div className={b('title')} style={{ color: colorCSS(color) }}>
          {title}
          {subtitle && <span className={b('subtitle')}>{subtitle}</span>}
        </div>
        {text && <span className={b('text')}>{text}</span>}
      </div>
    </div>
  )
}

export default Text
