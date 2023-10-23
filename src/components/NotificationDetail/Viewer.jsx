import React, { useState, useEffect, useRef } from 'react'

import { Page, Error } from '.'

import { Icon, BEM } from '@trading/energies-ui'

import styles from './Viewer.module.scss'
const b = BEM(styles)
/*----------------------------------------------------------------------------*/
// EXEMPLE
/*
{
  "type": "viewer",
  "files": [
   {
      "title": "File1",
      "url": "https://home-dev.dts.corp.local/dashboarddocuments/dashboard_libraries_0/dwp_db_lib_20200325_163945_2c333da/ms-viewer-16348197029/TS%20Forward_Dataviz_Juillet2021.pdf",
      "type": "pdf"
    },
    {
      "title": "File2",
      "url": "https://home-dev.dts.corp.local/dashboarddocuments/dashboard_libraries_10/dashboard_folder_2/ms-viewer-16901873974/TEMF%20DWP%20Admin%20Matters_Updated_26July2023.pdf",
      "type": "pdf"
    },
    {
      "title": "Image 1",
      "url": "https://picsum.photos/id/1011/400/250",
      "type": "image"
    },
    {
      "title": "Image 2",
      "url": "https://picsum.photos/id/1010/400/250",
      "type": "image"
    },
    {
      "title": "Image 3",
      "url": "https://picsum.photos/id/1004/400/250",
      "type": "image"
    }
  ]
}
*/
/*----------------------------------------------------------------------------*/
export const ViewerImage = (file) => {
    const { title, url } = file
    return (
        <>
            <ViewerPlaceholder {...file} />
            <figure className={b('figure')} data-viewer="img">
                <img className={b('image')} src={url} alt={title} onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.style.display = "none"
                    }}/>
                {title && (
                    <figcaption className={b('title')}>{title}</figcaption>
                )}
            </figure>
        </>
    )
}
/*----------------------------------------------------------------------------*/
export const ViewerDoc = (file) => {
    const { title, type, zoom, url, iframe } = file;

    const [placeholder, setPlaceholder] = useState(false);
    const [loaded, seLoaded] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPlaceholder(!loaded);
        }, 300);

        return () => clearTimeout(timeoutId); // Cleanup timeout if the component is unmounted
    }, []);

    const getViewer = () => {
        if (iframe) return iframe;
        if (type === 'pdf') return zoom === true ? `${url}#toolbar=0&view=Fit` : `/Style%20Library/apps/viewer/simple.html#${url}`;
    }

    const viewer = getViewer();

    return (
        <>
            {placeholder && <ViewerPlaceholder {...file} />}
            <iframe
                sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
                className={b('doc')}
                src={viewer}
                title={title}
                onLoad={(e) => seLoaded(true)}
            >
            </iframe>
        </>
    );
}


/*----------------------------------------------------------------------------*/
export const ViewerPlaceholder = (file) => (
    <span className={b('placeholder')}>
        <Icon name="outline/file-ban" size="xxl" />
        <span className={b('message')}>
            This file is not supported
            {file.title && <>: <b>{file.title}</b></>}
        </span>
    </span>
)
/*----------------------------------------------------------------------------*/
export const ViewerItem = React.forwardRef((file, ref) => {

    const doc = file.type === 'office' || file.type === 'pdf'
    const image = file.type === 'image'
    const placeholder = !doc && !image

    const onClickHandler = () => {
        !placeholder && file?.onClick()
    }

    return (
        <div
            ref={ref}
            className={b('item', { hasCursor: !placeholder })}
            onClick={onClickHandler}
        >
            {doc && <ViewerDoc {...file} />}
            {image && <ViewerImage {...file} />}
            {placeholder && <ViewerPlaceholder {...file} />}
        </div >
    )
});

/*----------------------------------------------------------------------------*/
export const Viewer = ({ type, files }) => {
    const refs = useRef(new Array())

    const [select, setSelected] = useState(false)
    const [active, setActive] = useState(0)

    const goTo = (index) => {
        let i = index
        if (index === files.length) i = 0
        if (index === -1) i = files.length - 1
        setActive(i)
        refs.current[i]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        })
    }

    return (
        <div className={b()} data-type={type}>
            <span
                className={b('prev')}
                onClick={() => goTo(active - 1)}
            >
                <Icon name="outline/angle-left" size="large" />
            </span>
            <div className={b('inner')}>
                {files?.map((file, i) => (
                    <ViewerItem
                        {...file}
                        key={i}
                        onClick={() => setSelected(file)}
                        setActive={() => setActive(i)}
                        ref={(el) => refs?.current?.push(el)}
                    />
                ))}
                {(!files || files.length === 0) && (
                    <Error variable='files' value={files} />
                )}
            </div>
            <span
                className={b('next')}
                onClick={() => goTo(active + 1)}
            >
                <Icon name="outline/angle-right" size="large" />
            </span>
            {files.length > 1 && <>
                <ul className={b('dots')}>
                    {files?.map((_, i) => {
                        return (
                            <li
                                key={i}
                                className={b('dot', { isActive: active === i })}
                                onClick={() => goTo(i)}
                            ></li>
                        )
                    })}
                </ul>
                <span className={b('count')}>
                    <Icon name="outline/file" size="small" style={{ width: 30 }} />
                    {active + 1} / {files.length}
                </span>
            </>}
            {select && (
                <Page
                    className={b('fullscreen')}
                    lightClose={select.type === 'image'}
                    onClose={() => setSelected(false)}
                >
                    <div className={b('zoom')}>
                        <ViewerItem {...select} zoom={true} />
                    </div>
                </Page>
            )}
        </div>

    )
}

export default Viewer
