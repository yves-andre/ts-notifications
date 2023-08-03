import React, {useEffect, useState} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ValidationForm, { ItemValidationTemplate } from '../../components/validation-form/validation-form';

import Notification from '../../data/interfaces/notification'
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getValidationFormById, updateFormPendingTimeout, validateFormById } from '../../services/notification-service';

import validationFormSample from './validation-form-sample.json';



export const Validation: React.FC = () => {
  let { id } = useParams()
  const navigate = useNavigate()
  const [validationForm, setValidationForm] = useState<ItemValidationTemplate|undefined>(undefined);
  const [notification, setNotification] = useState<Notification>()
  const [initialTime, setInitialTime] = useState(0)
  const [finalTime, setFinalTime] = useState(0)
  const [comment, setComment] = useState('')
  const [pendingTimeout, setPendingTimeout] = useState<NodeJS.Timeout>()

  const notifications = useAppSelector(
    (state) => state.notifications.notificationItems
  )
  useEffect(() => {
    const notif = notifications?.find((notif) => notif._id === id)
    if (notif) {
      setNotification(notif);
    }
  }, [notifications]);

  useEffect(() => {
    return () => {
      pendingTimeout && clearTimeout(pendingTimeout)
    }
  }, []);

  const checkAndUpdateNotificationPendingTime = (notif: Notification) => {
    pendingTimeout && clearTimeout(pendingTimeout)
    const MAXIMUM_PENDING_TIME_MINUTES = 10
    if (!notif.isPending || !notif.pendingFrom) { 
      return;
    }
    const pendingFrom = new Date(notif.pendingFrom)
    const now = new Date()
    pendingFrom.setMinutes(pendingFrom.getMinutes() + MAXIMUM_PENDING_TIME_MINUTES)
    if (pendingFrom < now) {
      updateFormPendingTimeout(notif.reference)
    } else {
      // Timeout when isPending is supposed to be reset
      const timeDifference = pendingFrom.getTime() - now.getTime()
      const timeoutID = setTimeout(() => {
          updateFormPendingTimeout(notif.reference)
          setPendingTimeout(undefined)
        }, timeDifference);
      setPendingTimeout(timeoutID);
    }
  }

  useEffect(() => {
    if (notification && notification.hasValidationForm) {
      //checkAndUpdateNotificationPendingTime(notification)
      if (initialTime === 0) {
        setInitialTime(performance.now())
      }
      getValidationFormById(notification._id)
        .then((validationJSON) => {
          const re = new RegExp("\u2028|\u2029|\uFEFF");
          const result = validationJSON.replace(re, '');
          console.log(result)
          console.log(JSON.parse(result))
          setValidationForm(validationFormSample);
      })
      .catch(console.error)
    }
  }, [notification?.hasValidationForm]);

  useEffect(() => {
    if (notification) {
      checkAndUpdateNotificationPendingTime(notification)
    }
  }, [notification?.isPending]);

  useEffect(() => {
    if (validationForm && finalTime === 0) {
      setFinalTime(performance.now())
    }
  }, [validationForm]);

  const onBackClick = () => {
    navigate('/explorer')
  }

  const getDuration = () => {
    if (finalTime > 0 && initialTime > 0) {
      return `${((finalTime - initialTime) / 1000.0).toFixed(2)} seconds`
    }
    return 'Calculating...'
  }

  const updateFormStatus = (isValidated: boolean) => {
    if (notification?._id) {
      validateFormById(notification._id, {isValidated: isValidated, comment: comment})
    }
  }


  return (<div style={{padding: "10px"}}>
    <button style={{maxWidth:"100px", margin:"10px"}} onClick={() => onBackClick()}>BACK</button>
    <div style={{color:"darkseagreen", marginTop:"10px"}}>Total time : {getDuration()}</div>
    { !validationForm && !notification && <Loader></Loader> }
    { (validationForm && notification && !notification.treatedBy) && <>
      {
        notification.isPending ?
          <span style={{color: 'goldenrod'}}>
            Notification's treatment is pending...
          </span> :
        <>
          Comment: <input type="text" name="comment" value={comment} onChange={e => setComment(e.target.value)}></input>
          <button onClick={() => updateFormStatus(true)}>Validate</button>
          <button onClick={() => updateFormStatus(false)}>Refuse</button>
        </>
      }
    </> }

      { (validationForm && notification && notification.treatedBy) &&
        <div style={{color:'green'}}>Notification is treated</div> 
      }

    {(validationForm && notification) &&
      <ValidationForm validationForm={validationForm}></ValidationForm> 
    }   
    
    
  </div>);
}

export default Validation