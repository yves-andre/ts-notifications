import React from 'react'

import { Error } from './'

import { BEM } from '@trading/energies-ui'
import styles from './Slideshow.module.scss'
const b = BEM(styles)

/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "slideshow",
  "slides": [
   {
      "title": "Image 1",
      "url": "https://picsum.photos/id/1011/400/250"
    },
    {
      "title": "Image 2",
      "url": "https://picsum.photos/id/1010/400/250"
    },
    {
      "title": "Image 3",
      "url": "https://picsum.photos/id/1007/400/250"
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/
export const Slideshow = ({ type, slides }) => {
  return (
    <div className={b()} data-type={type}>
      <div className={b('inner')}>
        {slides?.map((slide, i) => (
          <figure className={b('slide')} key={i}>
            <img className={b('image')} src={slide.url} alt={slide.title} />
            {slide.title && (
              <figcaption className={b('title')}>{slide.title}</figcaption>
            )}
          </figure>
        ))}
        {(!slides || slides.length === 0) && (
          <Error variable='slides' value={slides} />
        )}
      </div>
    </div>
  )
}

export default Slideshow
