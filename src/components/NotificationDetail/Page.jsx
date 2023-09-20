import React, { useState, useEffect } from 'react'
import { Picture, IconButton, BEM } from '@trading/energies-ui'
import styles from './Page.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
export const PageHeader = ({ icon, image, title, subtitle }) => (
  <header className={b('header')}>
    {icon && (
      <Picture
        className={b('icon')}
        color='corporate/lightPearl'
        icon={icon}
        size='large'
        person
      />
    )}
    {image && (
      <Picture
        className={b('image')}
        color='rgba(255,255,225, 0.16)'
        person
        src={image}
      />
    )}
    {title && <span className={b('title')}>{title}</span>}
    {subtitle && <span className={b('subtitle')}>{subtitle}</span>}
  </header>
)

/*----------------------------------------------------------------------------*/
export const Page = ({ className, children, type, onClose }) => {
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      onClose?.()
      setClosing(false)
    }, 150)
  }

  const handleEscapePress = (event) => {
    const { keyCode } = event
    if (keyCode === 27) {
      handleClose()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress)
    return () => {
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [])

  return (
    <div
      className={b({ isClosing: closing }, [], className)}
      data-type={type}
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        className={b('back')}
        icon='arrowLeft'
        round={true}
        color='rgba(0,0,0,.4)'
        onClick={handleClose}
      >
        Close
      </IconButton>
      <div className={b('content')} data-page>{children}</div>
    </div>
  )
}
Page.Header = PageHeader
export default Page
