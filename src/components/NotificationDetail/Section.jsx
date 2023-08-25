import React, { useState } from 'react'
import { Block, Infotip, Error } from './'

import { Icon, Tooltip, BEM } from '@trading/energies-ui'
import styles from './Section.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
//EXEMPLE
/*
{
  "type": "sectionBlock",
  "title": "Details",
  "subtitle": "",
  "infotip": {
    "icon": "info",
    "color": "grey",
    "tooltip": "Caption",
    "closeButtonText": "Ok, Got it",
    "items": [
      {
        "type": "text",
        "icon": "warning",
        "color": "yellow",
        "title": "Mandatory Check",
        "subtitle": "",
        "text": "You have to check this line if you want to validate this item."
      },
      {
        "type": "text",
        "icon": "warning",
        "color": "purple",
        "title": "With beneficiary company",
        "subtitle": "",
        "text": "There is a beneficiary company in this expense line."
      }
    ]
  },
*/
/*----------------------------------------------------------------------------*/

/*-----------------------------VERIFICATION : OK-----------------------------*/
export const Section = ({ type, title, subtitle, infotip, items }) => {
  const [infotipOpen, setInfotipOpen] = useState(false)
  return (
    <section className={b()} data-type={type}>
      <header className={b('header')}>
        {title && (
          <Block type='title'>
            {title}
            {infotip && (
              <>
                <Tooltip title={infotip.tooltip}>
                  <Icon
                    className={b('info')}
                    name={infotip.icon}
                    color={infotip.color}
                    size='xs'
                    onClick={() => setInfotipOpen(true)}
                  />
                </Tooltip>
                <Infotip
                  {...infotip}
                  open={infotipOpen}
                  onClose={() => setInfotipOpen(false)}
                />
              </>
            )}
          </Block>
        )}
        {subtitle && <span className={b('subtitle')}>{subtitle}</span>}
      </header>
      <div className={b('content')}>
        {items?.map((item, i) => (
          <Block key={i} {...item} />
        ))}
        {(!items || items.length === 0) && (
          <Error variable='items' value={items} />
        )}
      </div>
    </section>
  )
}

export default Section
