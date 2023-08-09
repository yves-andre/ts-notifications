import React from 'react'
import { Picture, Dropdown, Icon, BEM } from '@trading/energies-ui'

import styles from './Header.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
 {
  "type": "headerBlock",
  "title": "{{expense.title}}",
  "subtitle": "{{expense.subtitle}}",
  "image": "{{expense.user.image}}",
  "total": "{{expense.total}}",
  "buttons": [
    {
      "name": "Open",
      "icon": "Open",
      "color": "blue",
      "type": "web_url",
      "url": "{{expense.expenseURL}}"
    },
    {
      "name": "Edit",
      "icon": "pen",
      "color": "orange",
      "type": "web_url",
      "url": "{{expense.expenseURL}}"
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/
export const Header = ({ image, title, subtitle, total, buttons, type }) => {
  const actions = buttons.map((button) => ({
    icon: button.icon,
    color: button.color,
    children: button.name,
    onClick: () => console.log(button.name, button.url),
  }))

  return (
    <header className={b()} data-type={type}>
      <div className={b('inner')}>
        {actions?.length > 0 && (
          <Dropdown className={b('actions')} items={actions}>
            <Icon name='filled/more-vertical' />
          </Dropdown>
        )}
        <div className={b('employee')}>
          <Picture
            className={b('photo')}
            color='rgba(255,255,225, 0.16)'
            person
            src={image}
          />
          {title && <span className={b('title')}>{title}</span>}
        </div>
        {subtitle && <div className={b('subtitle')}>{subtitle}</div>}
        {total && <div className={b('total')}>{total}</div>}
      </div>
    </header>
  )
}

export default Header
