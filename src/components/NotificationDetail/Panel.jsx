import React, {useEffect, useState} from 'react'
import {BEM, IconButton, setGradient, setTheme} from '@trading/energies-ui'
import {Alert, Block, Error} from './'
import mock from './_mock.json'
import styles from './Panel.module.scss'
import {getValidationFormById} from "../../services/notification-service";
import validationFormSample from "../../pages/validation/validation-form-sample.json";
import {ItemValidationTemplate} from "../validation-form/validation-form-service";
import error from "./Error";

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
export const Panel = ({notification, onClose, loading = false }) => {

  const [template, setTemplate] = useState(undefined);
  const [header, setHeader] = useState(undefined);
  const [footer, setFooter] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [isLoading, setIsLoading] = useState(loading);
  // const template = mock.template
  const theme = setTheme(template?.color || '')
  const gradientStyles = setGradient(template?.gradient, 'background', true)


  const [alert, setAlert] = useState(true)
  const loadNotificationForm = () => {
    setAlert(false);
    setIsLoading(true);
    if (notification && notification.hasValidationForm) {
      getValidationFormById(notification._id)
        .then((validationJSON) => {
           // const re = new RegExp("\u2028|\u2029|\uFEFF");
           // const result = validationJSON.replace(re, '');
           console.log(validationJSON)

          //  console.log(JSON.parse(result))
          setTemplate(validationJSON.template);
          const items = validationFormSample?.template?.items
          // const items = validationJSON?.template?.items
          const header = items?.find((i) => i.type === 'headerBlock')
          const footer = items?.find((i) => i.type === 'footerBlock')
          const content = items?.filter(
            (i) => i.type !== 'headerBlock' && i.type !== 'footerBlock'
          )
          setItems(items)
          setHeader(header)
          setFooter(footer)
          setContent(content)
          setIsLoading(false);
        })
        .catch((error) => {
          setAlert(true);
          setIsLoading(false);
          console.log(error)
        })
    }
  }

  useEffect(() => {
    console.log('notification', notification)
    if(notification && notification.hasValidationForm) {
      loadNotificationForm()
    } else {
      setTemplate(undefined)
    }
  }, [notification])



  return (
    <div
      className={b({
        hasHeader: header,
        isLoading: isLoading,
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
