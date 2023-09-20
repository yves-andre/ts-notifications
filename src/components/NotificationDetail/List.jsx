import React, { useState } from 'react'

import { Block, Error, Page } from './'

import { Icon, BEM, colorCSS } from '@trading/energies-ui'

import styles from './List.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "listBlock",
  "data": "{{expense.items}}",
  "listItems": [
    {
      "title": "{{item.title}}",
      "status": "{{item.status}}",
      "subtitle": "{{item.subtitle}}",
      "image": "{{item.image}}",
      "value": "{{item.total}} {{item.currency}}",
      "items": [
        {
          "type": "viewer",
          "files": "{{item.uploadedImages}}"
        },
        {
          "type": "title",
          "title": "{{item.title}}"
        },
        {
          "type": "sectionBlock",
          "items": [
            {
              "type": "date",
              "label": "Date",
              "value": "{{item.date}}"
            }
          ]
        },
        {
          "type": "sectionBlock",
          "title": "Details",
          "items": [
            {
              "type": "dataList",
              "display": "block",
              "data": "{{item.detailsDataList}}"
            }
          ]
        },
        {
          "type": "sectionBlock",
          "title": "Price Details",
          "items": [
            {
              "type": "dataList",
              "display": "inline",
              "data": "{{item.priceDetailsDataList}}"
            }
          ]
        },
        {
          "type": "footerBlock",
          "displayedIf": "{{validation[item.key]}}",
          "items": [
            {
              "type": "rulesValidationButton",
              "label": "Comment Check",
              "color": "orange",
              "icon": "uncheck",
              "validationValue": "{{validation[item.key]}}",
              "validatedConfig": {
                "label": "Comment checked",
                "icon": "check",
                "color": "green"
              }
            }
          ]
        }
      ]
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/
const ListItem = ({ title, subtitle, status, image, icon, value, items }) => {
  const [open, setOpen] = useState(false)
  const hasItems = items?.length !== 0

  const onClickHandler = () => {
    if (hasItems) {
      setOpen(true)
    }
  }

  return (
    <li className={b('item', { hasItems })} onClick={onClickHandler}>
      {image && (
        <picture className={b('picture')}>
          <img
            className={b('image')}
            src={image}
            onError={(e) => {
              const _this = e.target
              _this.onerror = null
              _this.parentNode?.setAttribute('data-empty', 'true')
            }}
          />
        </picture>
      )}
      {icon && <Icon className={b('icon')} name={icon} />}
      <div className={b('content')}>
        <div className={b('title')} style={{ color: colorCSS(status?.color) }}>
          <span className={b('ellipsis')}>{title}</span>
          {status && (
            <Icon
              className={b('status')}
              name={status.icon}
              color={status.color}
              size='xs'
            />
          )}
        </div>
        {subtitle && <span className={b('subtitle')}>{subtitle}</span>}
      </div>
      {value && <span className={b('value')}>{value}</span>}

      {hasItems && (
        <>
          <Icon className={b('chevron')} name='filled/angle-right' />
          {open && (
            <Page onClose={() => setOpen(false)}>
              {items.map((item, i) => (
                <Block key={i} {...item} />
              ))}
            </Page>
          )}
        </>
      )}
    </li>
  )
}
/*----------------------------------------------------------------------------*/

export const List = ({ type, listItems, display }) => {
  return (
    <ul className={b({}, [display])} data-type={type} data-display={display}>
      {listItems?.map((item, i) => (
        <ListItem key={i} {...item} />
      ))}
      {(!listItems || listItems.length === 0) && (
        <Error variable='listItems' value={listItems} />
      )}
    </ul>
  )
}

export default List
