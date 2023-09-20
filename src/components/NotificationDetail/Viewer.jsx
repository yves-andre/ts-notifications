import React, { useState } from 'react'

import { Page, Error } from '.'

import { BEM } from '@trading/energies-ui'

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
      "ext": "pdf"
    },
    {
      "title": "File2",
      "url": "https://home-dev.dts.corp.local/dashboarddocuments/dashboard_libraries_10/dashboard_folder_2/ms-viewer-16901873974/TEMF%20DWP%20Admin%20Matters_Updated_26July2023.pdf",
      "ext": "pdf"
    },
    {
      "title": "Image 1",
      "url": "https://picsum.photos/id/1011/400/250",
      "ext": "jpg"
    },
    {
      "title": "Image 2",
      "url": "https://picsum.photos/id/1010/400/250",
      "ext": "jpg"
    },
    {
      "title": "Image 3",
      "url": "https://picsum.photos/id/1004/400/250",
      "ext": "jpg"
    }
  ]
}
*/

/*----------------------------------------------------------------------------*/
export const ViewerImage = ({ title, url }) => {
    return (
        <figure className={b('figure')}>
            <img className={b('image')} src={url} alt={title} />
            {title && (
                <figcaption className={b('title')}>{title}</figcaption>
            )}
        </figure>
    )
}
/*----------------------------------------------------------------------------*/
export const ViewerFile = ({ title, url, ext, zoom = false }) => {

    const getViewer = () => {
        if (ext === 'pdf') return zoom === true ? url : `/Style%20Library/apps/viewer/simple.html#${url}`
        return `/_layouts/15/WopiFrame2.aspx?sourcedoc=${url}&action=embedview&ClientRender=1`
    }

    return (
        <iframe
            className={b('file')}
            src={getViewer()}
            title={title}
        >
        </iframe>
    )
}

/*----------------------------------------------------------------------------*/
export const ViewerItem = (file, zoom = false) => {
    switch (file.ext?.toLowerCase()) {
        case 'pdf':
        case 'xls':
        case 'doc':
            return <ViewerFile {...file} zoom={zoom} />
        default:
            return <ViewerImage {...file} />
    }
}
/*----------------------------------------------------------------------------*/
export const Viewer = ({ type, files }) => {
    const [zoom, setZoom] = useState(false)
    return (
        <>
            <div className={b()} data-type={type}>
                <div className={b('inner')}>
                    {files?.map((file, i) => (
                        <div className={b('item')} key={i} onClick={() => setZoom(file)}>
                            <ViewerItem key={i} {...file} />
                        </div>
                    ))}
                    {(!files || files.length === 0) && (
                        <Error variable='files' value={files} />
                    )}
                </div>
                {zoom && (
                    <Page onClose={() => setZoom(false)}>
                        <div className={b('zoom')}>
                            <ViewerItem {...zoom} />
                        </div>
                    </Page>
                )}
            </div>
        </>

    )
}

export default Viewer
