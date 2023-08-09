import React, { useState } from 'react'

import { IconButton, setTheme, setGradient, BEM } from '@trading/energies-ui'

import { Block, Error, Alert } from './'

import mock from './_mock.json'

import styles from './Panel.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/

const PanelClose = ({ onClick, header }) => {
  return (
    <IconButton
      className={b('close')}
      icon='crossCancel50'
      round={true}
      onClick={onClick}
      color={header ? 'rgba(255,255,255,.1)' : 'ultraLightGray'}
    >
      Close
    </IconButton>
  )
}

/*----------------------------------------------------------------------------*/
export const Panel = ({ onClose, loading = false }) => {

  const template = mock.template

  const theme = setTheme(template?.color)
  const gradientStyles = setGradient(template?.gradient, 'background', true)

  const items = template?.items

  const header = items?.find((i) => i.type === 'headerBlock')
  const footer = items?.find((i) => i.type === 'footerBlock')
  const content = items?.filter(
    (i) => i.type !== 'headerBlock' && i.type !== 'footerBlock'
  )

  const [alert, setAlert] = useState(true)

  return (
    <div
      className={b({
        hasHeader: header,
        isLoading: loading,
      })}
      style={{ ...theme, ...gradientStyles }}
    >
      {onClose && <PanelClose onClick={onClose} header={header} />}

      {header && <Block {...header} />}

      {alert && (
        <Alert
          color='corporate/red'
          icon='filled/exclamation-circle'
          onClose={() => setAlert(false)}
        >
          Sorry, the validation of this item does not succeed. Please try again.
        </Alert>
      )}

      <div className={b('content')}>
        {content?.map((block, i) => (
          <Block key={i} {...block} />
        ))}
        {(!items || items.length === 0) && (
          <Error variable='items' value={items} />
        )}
      </div>

      {footer && <Block {...footer} />}
    </div>
  )
}

export default Panel
