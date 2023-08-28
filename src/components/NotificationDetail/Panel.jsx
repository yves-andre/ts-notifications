import React, {useEffect, useRef, useState} from 'react'
import {BEM, IconButton, setGradient, setTheme} from '@trading/energies-ui'
import {Alert, Block, Error} from './'
import mock from './_mock.json'
import styles from './Panel.module.scss'
import {
  getNotificationIsPending,
  getValidationFormById,
  NOTIFICATION_SERVICE_ERRORS,
  validateFormById
} from "../../services/notification-service";
import validationFormSample from "../../pages/validation/validation-form-sample.json";
import {ItemValidationTemplate} from "../validation-form/validation-form-service";
import error from "./Error";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import {notificationActions} from "../../store/notifications-slice";

const b = BEM(styles)

let currentAbortController = null;

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
export const Panel = ({notification, onClose, loading = false, isDebug = false, validationJson = null }) => {

  const [template, setTemplate] = useState(undefined);
  const [header, setHeader] = useState(undefined);
  const [footer, setFooter] = useState(undefined);
  const [content, setContent] = useState(undefined);
  const [items, setItems] = useState(undefined);
  const [isLoading, setIsLoading] = useState(loading);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const theme = setTheme(template?.color || '')
  const gradientStyles = setGradient(template?.gradient, 'background', true)
  const currentValidationForm = useRef(null);
  const currentValidationFormJSON = useRef(null);
  const [alert, setAlert] = useState(true)
  const dispatch = useAppDispatch();



  /**
   * Display validation form
   * @param validationForm
   */
  const displayValidationForm = (validationForm) => {
      setAlert(false);
      setIsPending(false);
      setTemplate(validationForm.template);
      const items = updateItemsConfig(validationForm?.template?.items)
      const header = items?.find((i) => i.type === 'headerBlock')
      const footer = items?.find((i) => i.type === 'footerBlock')
      const content = items?.filter(
          (i) => i.type !== 'headerBlock' && i.type !== 'footerBlock'
      )
      setItems(items)
      setHeader(header)
      setFooter(footer)
      setContent(content)
  }

  /**
   * Update items config to add onValidate and onReject functions
   *
   * @param items
   * @returns {*[]|*}
   */
  const updateItemsConfig = (items) => {
    if(!items) return [];
    return items.map((item) => {
      const pendingStatus = getNotificationIsPending(notification)
      if(!pendingStatus.isPending && pendingStatus.isTimeout) {
        setAlert(true)
      }
      if(pendingStatus.isPending) {
        setIsPending(true)
      }
      if (item.type === 'footerBlock') {
        item.items = item.items.map((footerItem) => ({
          ...footerItem,
          notificationStatus: notification?.status,
          notificationDetails: notification?.details,
        }));
      }
      const updatedItem = {...item}
      switch(item.type) {
        case 'hierarchyValidation':
          updatedItem.isDisabled = pendingStatus.isPending;
          updatedItem.onValidate = (comment) => {
            return updateFormStatus(true, comment)
          };
          updatedItem.onReject = (comment) => {
            return updateFormStatus(false, comment)
          };
          break;
      }

      if(item.items) {
        updatedItem.items = updateItemsConfig(item.items)
      }
      return updatedItem;
    })
  }

  /**
   * Load validation form
   */
  const loadNotificationForm = async () => {
    if(currentAbortController) {
      currentAbortController.abort()
    }
    currentAbortController = new AbortController();
    currentValidationFormJSON.current = null;
    const signal = currentAbortController.signal;
    setAlert(false);
    setIsPending(false);
    setIsLoading(true);
    if (notification && notification.hasValidationForm) {
      currentValidationForm.current = notification._id;
      try {
        const validationJSON = await getValidationFormById(notification._id, signal)
        currentValidationFormJSON.current = validationJSON;
        displayValidationForm(validationJSON)
        setIsLoading(false);
      } catch (e) {
        if(e?.name === 'AbortError') {
          return;
        } else {
          setIsLoading(false);
        }
      }
    }
  }

  /**
   * Load validation form on notification change
   */
  useEffect(() => {
    if (isDebug) {
      return;
    }
    if (notification?.hasValidationForm && notification?._id !== currentValidationForm.current) {
      loadNotificationForm()
    } else {
      if(notification?.hasValidationForm && notification?._id === currentValidationForm.current) {
        // If notification is the same, display the same form with updated status
        if(currentValidationFormJSON.current) {
          displayValidationForm(currentValidationFormJSON.current)
        }
      } else {
        setTemplate(undefined)
      }
    }
  }, [notification])

  /**
   * Display validation form on debug mode
   */
  useEffect(() => {
      if(validationJson && isDebug){
          displayValidationForm(validationJson)
      }
  }, [validationJson])

  /**
   * Update form status
   * @param isValidated
   * @param comment
   * @returns {Promise<any>}
   */
  const updateFormStatus = async (isValidated, comment) => {
    if (notification?._id) {
      setIsUpdating(true);

      dispatch(notificationActions.updatePendingStatus({
        notificationId: notification._id,
        isPending: true
      }));

      const validationResult = await validateFormById(notification._id, {isValidated: isValidated, comment: comment});
      return validationResult;
    }
  }


  return (
    <div
      className={b({
        hasHeader: header,
        isLoading: isLoading

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
      {isPending && (
        <Alert
          color='secondary/orange'
          icon='filled/info-circle'
          onClose={() => setIsPending(false)}
        >
          The validation for this item is currently underway. You are free to proceed with other tasks while this validation is in progress.
        </Alert>
      )}

      <div className={
        b('content')
      }>
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
