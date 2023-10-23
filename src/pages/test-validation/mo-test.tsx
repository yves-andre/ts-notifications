import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Layout, Header, LocalNav, Flex, Col, IconButton } from '@trading/energies-ui'
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

import NotificationDetail from '../../components/NotificationDetail'

import './../../components/page/Page.scss'
import { APP_CONFIG } from '../../data/app-config'

const mock = {
  "version": "1.0",
  "type": "itemValidationTemplate",
  "validationRules": {},
  "template": {
    "color": "corporate/lightBlue",
    "gradient": "secondary/purple1",
    "items": [
      {
        "type": "headerBlock",
        "title": "Elena CORMIER",
        "subtitle": "HMC Oil Transportation Mesurement Comitee Meeting at Exxomobil Spring Texas",
        "image": "https://home.dts.corp.local/Style%20Library/TSImg/Charts/Delve/capucine.viviani@totsa.com.jpg",
        "total": "USD.- 1'044.00",
        "buttons": [
          {
            "name": "Open",
            "icon": "filled/arrow-export",
            "color": "blue",
            "type": "web_url",
            "url": "www.example.com"
          },
          {
            "name": "Edit",
            "icon": "filled/pen",
            "color": "orange",
            "type": "web_url",
            "url": "www.example.com"
          }
        ]
      },
      {
        "type": "sectionBlock",
        "title": "Mission Order",
        "subtitle": "#EXPTS1234567",
        "items": [
          {
            "type": "fromToDate",
            "labelFrom": "From",
            "labelTo": "To",
            "dateFormat": "DD MMM. YYYY",
            "fromDate": "10 Oct. 2022",
            "toDate": "11 Oct. 2022"
          }
        ]
      },
      {
        "type": "sectionBlock",
        "title": "Travel details",
        "subtitle": "",
        "items": [
          {
            "type": "listBlock",
            "listItems": [
              {
                "title": "Flight",
                "subtitle": "10 Oct 2022",
                "value": "498 USD",
                "items": [
                  {
                    "type": "viewer",
                    "files": [
                      {
                        "title": "",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Fil<es-001fecc9/Fonctionnel%20-%20Specs%20v3.pdf?d=w1b44c46848194a65aff5727f77643d9f",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B1B44C468-4819-4A65-AFF5-727F77643D9F%7D&file=Fonctionnel%20-%20Specs%20v3.pdf&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "Image",
                        "url": "https://images.freeimages.com/images/large-previews/913/sea-3-1188161.jpg",
                        "type": "image"
                      },
                      {
                        "title": "Doc",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-b99c4f1d/Release%20Note%20NOTIFIER.docx?d=w997674f7bb694ec9b3128627044cabbd",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B997674F7-BB69-4EC9-B312-8627044CABBD%7D&file=Release%20Note%20NOTIFIER.docx&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "EML",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Notifier V2.0 (Kerberos).eml",
                        "type": "office"
                      },
                      {
                        "title": "XSLX",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Workbook.xlsx?d=we41fb685b22c43beb1a8e22ae5b53c9d",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7BE41FB685-B22C-43BE-B1A8-E22AE5B53C9D%7D&file=Workbook.xlsx&action=embedview",
                        "type": "office"
                      },
                    ]
                  },
                  {
                    "type": "title",
                    "title": "Item Title"
                  },
                  {
                    "type": "sectionBlock",
                    "items": [
                      {
                        "type": "fromToDate",
                        "labelFrom": "From",
                        "labelTo": "To",
                        "dateFormat": "DD MMM. YYYY",
                        "fromDate": "10 Oct. 2022",
                        "toDate": "11 Oct. 2022"
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
                        "data": [
                          {
                            "label": "Lorem ipsum dolor",
                            "value": "Ut sed faucibus eros"
                          }
                        ]
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
                        "data": [
                          {
                            "label": "Amount",
                            "value": "30",
                            "color": "blue"
                          },
                          {
                            "label": "Currency",
                            "value": "CHF"
                          },
                          {
                            "label": "Exchange Rate",
                            "value": "1.0000",
                            "color": "blue"
                          },
                          {
                            "label": "Price per participant (CHF)",
                            "value": "15.00",
                            "color": "blue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "title": "Flight",
                "subtitle": "10 Oct 2022",
                "value": "52.00 USD",
                "items": [
                  {
                    "type": "viewer",
                    "files": [
                      {
                        "title": "",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Fil<es-001fecc9/Fonctionnel%20-%20Specs%20v3.pdf?d=w1b44c46848194a65aff5727f77643d9f",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B1B44C468-4819-4A65-AFF5-727F77643D9F%7D&file=Fonctionnel%20-%20Specs%20v3.pdf&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "Image",
                        "url": "https://images.freeimages.com/images/large-previews/913/sea-3-1188161.jpg",
                        "type": "image"
                      },
                      {
                        "title": "Doc",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-b99c4f1d/Release%20Note%20NOTIFIER.docx?d=w997674f7bb694ec9b3128627044cabbd",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B997674F7-BB69-4EC9-B312-8627044CABBD%7D&file=Release%20Note%20NOTIFIER.docx&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "EML",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Notifier V2.0 (Kerberos).eml",
                        "type": "office"
                      },
                      {
                        "title": "XSLX",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Workbook.xlsx?d=we41fb685b22c43beb1a8e22ae5b53c9d",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7BE41FB685-B22C-43BE-B1A8-E22AE5B53C9D%7D&file=Workbook.xlsx&action=embedview",
                        "type": "office"
                      },
                    ]
                  },
                  {
                    "type": "title",
                    "title": "Item title"
                  },
                  {
                    "type": "sectionBlock",
                    "items": [
                      {
                        "type": "fromToDate",
                        "labelFrom": "From",
                        "labelTo": "To",
                        "dateFormat": "DD MMM. YYYY",
                        "fromDate": "10 Oct. 2022",
                        "toDate": "11 Oct. 2022"
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
                        "data": [
                          {
                            "label": "Lorem ipsum dolor",
                            "value": "Ut sed faucibus eros"
                          }
                        ]
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
                        "data": [
                          {
                            "label": "Amount",
                            "value": "30",
                            "color": "blue"
                          },
                          {
                            "label": "Currency",
                            "value": "CHF"
                          },
                          {
                            "label": "Exchange Rate",
                            "value": "1.0000",
                            "color": "blue"
                          },
                          {
                            "label": "Price per participant (CHF)",
                            "value": "15.00",
                            "color": "blue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "title": "Rent Car",
                "subtitle": "10 Oct 2022",
                "value": "31.00 USD",
                "items": [
                  {
                    "type": "viewer",
                    "files": [
                      {
                        "title": "",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Fil<es-001fecc9/Fonctionnel%20-%20Specs%20v3.pdf?d=w1b44c46848194a65aff5727f77643d9f",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B1B44C468-4819-4A65-AFF5-727F77643D9F%7D&file=Fonctionnel%20-%20Specs%20v3.pdf&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "Image",
                        "url": "https://images.freeimages.com/images/large-previews/913/sea-3-1188161.jpg",
                        "type": "image"
                      },
                      {
                        "title": "Doc",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-b99c4f1d/Release%20Note%20NOTIFIER.docx?d=w997674f7bb694ec9b3128627044cabbd",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7B997674F7-BB69-4EC9-B312-8627044CABBD%7D&file=Release%20Note%20NOTIFIER.docx&action=embedview",
                        "type": "office"
                      },
                      {
                        "title": "EML",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Notifier V2.0 (Kerberos).eml",
                        "type": "office"
                      },
                      {
                        "title": "XSLX",
                        "url": "https://home.dts.corp.local/dashboarddocuments/dashboard_libraries_10/lib_221019_f8a16e6/Files-001fecc9/Old/Workbook.xlsx?d=we41fb685b22c43beb1a8e22ae5b53c9d",
                        "iframe": "https://home.dts.corp.local/dashboarddocuments/_layouts/15/WopiFrame.aspx?sourcedoc=%7BE41FB685-B22C-43BE-B1A8-E22AE5B53C9D%7D&file=Workbook.xlsx&action=embedview",
                        "type": "office"
                      },
                    ]
                  },
                  {
                    "type": "title",
                    "title": "Item title"
                  },
                  {
                    "type": "sectionBlock",
                    "items": [
                      {
                        "type": "fromToDate",
                        "labelFrom": "From",
                        "labelTo": "To",
                        "dateFormat": "DD MMM. YYYY",
                        "fromDate": "10 Oct. 2022",
                        "toDate": "11 Oct. 2022"
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
                        "data": [
                          {
                            "label": "Lorem ipsum dolor",
                            "value": "Ut sed faucibus eros"
                          }
                        ]
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
                        "data": [
                          {
                            "label": "Amount",
                            "value": "30",
                            "color": "blue"
                          },
                          {
                            "label": "Currency",
                            "value": "CHF"
                          },
                          {
                            "label": "Exchange Rate",
                            "value": "1.0000",
                            "color": "blue"
                          },
                          {
                            "label": "Price per participant (CHF)",
                            "value": "15.00",
                            "color": "blue"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "sectionBlock",
        "title": "Information",
        "subtitle": "",
        "items": [
          {
            "type": "dataList",
            "display": "block",
            "data": [
              {
                "label": "Training",
                "value": "Mesurment Committee Meetings"
              },
              {
                "label": "Event",
                "value": "Meeting"
              },
              {
                "label": "Counterparties",
                "value": "NA",
                "isEmpty": true
              },
              {
                "label": "General Comment",
                "value": "With the general manager, the ops lights teams and Amspec"
              }
            ]
          }
        ]
      },
      {
        "type": "sectionBlock",
        "title": "More",
        "subtitle": "",
        "items": [
          {
            "type": "listBlock",
            "display": "menu",
            "listItems": [
              {
                "title": "Travel Details",
                "subtitle": "Travel Agent, ...",
                "icon": "rocket",
                "items": [
                  {
                    "type": "employeeCard",
                    "data": {
                      "employee": {
                        "fullName": "Alexandra DE LA VILLARDIERE",
                        "image": "https://home.dts.corp.local/Style%20Library/TSImg/Charts/Delve/capucine.viviani@totsa.com.jpg",
                        "jobTitle": "General Manager Trading Ops and Logistics",
                        "branch": "TS",
                        "department": "Trading",
                        "site": "Geneva",
                        "service": "Trading Ops and Logistics",
                        "hierarchy": [
                          {
                            "level": "N+1",
                            "name": "Billie Jean"
                          },
                          {
                            "level": "N+2",
                            "name": "Jeanne DELANOE, John DOE, Elodie YGREK"
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              {
                "title": "Employee Details",
                "subtitle": "Elena CORMIER",
                "icon": "user",
                "items": [
                  {
                    "type": "employeeCard",
                    "data": {
                      "employee": {
                        "fullName": "Alexandra DE LA VILLARDIERE",
                        "image": "https://home.dts.corp.local/Style%20Library/TSImg/Charts/Delve/capucine.viviani@totsa.com.jpg",
                        "jobTitle": "General Manager Trading Ops and Logistics",
                        "branch": "TS",
                        "department": "Trading",
                        "site": "Geneva",
                        "service": "Trading Ops and Logistics",
                        "hierarchy": [
                          {
                            "level": "N+1",
                            "name": "Billie Jean"
                          },
                          {
                            "level": "N+2",
                            "name": "Jeanne DELANOE, John DOE, Elodie YGREK"
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              {
                "title": "Validation History",
                "subtitle": "2 Activities",
                "icon": "history",
                "items": [
                  {
                    "type": "validationHistory",
                    "data": {
                      "history": [
                        {
                          "title": "30 Oct 2022 | Hierarchy Validation",
                          "user": "Bille Jean, Jeanne DELANOE, John DOE, Elodie YGREK",
                          "status": {
                            "color": "orange",
                            "label": "Pending"
                          }
                        },
                        {
                          "title": "30 Oct 2022 | Employee Validation",
                          "user": "Alexandra DE LA VILLARDIERE",
                          "status": {
                            "color": "green",
                            "label": "Validated"
                          }
                        },
                        {
                          "title": "29 Oct 2022 | Secretary Validation",
                          "user": "Elena CORDOVA",
                          "status": {
                            "color": "green",
                            "label": "Validated"
                          },
                          "comment": "Ajouter le reçu du Taxi Uber svp"
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "footerBlock",
        "items": [
          {
            "type": "hierarchyValidation",
            "commentEnabled": true,
            "commentPlaceholder": "Comments",
            "validateButton": {
              "commentMandatory": false
            },
            "rejectButton": {
              "commentMandatory": true
            }
          }
        ]
      }
    ]
  }
}


const userProfile = {}
let textareaTimeout: any = null

export const MOTest: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation();


    const [validationForm, setValidationForm] = React.useState<any>(mock)

    const totalLogo =
        process.env.NODE_ENV !== 'development'
            ? APP_CONFIG.THEME_ASSETS.totalLogo.replace("{0}", process.env.REACT_APP_API_SP_RESSOURCES_URL as string)
            : 'https://www.totalenergies.fr/typo3conf/ext/de_site_package/Resources/Public/Dist/Images/Logo/totalenergies--vertical.svg'


    useEffect(() => {
        document.querySelector('.svg-gradient')?.remove()
        document.querySelector('.svg-gradient-styles')?.remove()
    }, [])



    const onValidationClose = () => {
        const resp = navigate({ pathname: `/explorer`, search: location.search })
    }

    return (
        <>
            <style>{`
        body{
          margin: 0;
        }
        :root[data-branding=new]{
          --ts-global-background: var(--ts-color-neutral-ultraLightGray);
        }
      `}</style>
            <Layout heightDefault={75} styleContent={{ padding: 0 }}>

                {/* HEADER ----------------------------------------------------------*/}
                <Layout.Header>
                    {<Header
                        userProfile={userProfile}
                        style={{
                            '--ts-global-theme': 'var(--ts-color-corporate-red)',
                            '--ts-global-theme-dark': 'var(--ts-color-corporate-red-dark)',
                            '--ts-global-gradient-button':
                                'var(--ts-gradient-corporate-red-button)',
                        } as React.CSSProperties}
                        logo={totalLogo}
                        variant='default'
                        active='notifications'
                        onChange={(key: any) => console.log(key)}
                        settingsAction={() => { }}
                        rainbow={true}
                        items={[
                            {
                                key: 'notifications',
                                title: 'Trading Notifications',
                                onClick: () => { },
                            },
                            {
                                key: 'dwp',
                                title: 'T&S Digital Workplace',
                                onClick: () => {
                                    window.location.replace(window.location.origin)
                                },
                            },
                        ]}
                    ></Header>}
                </Layout.Header>



                {/* CONTENT ---------------------------------------------------------*/}
                <Flex style={{ padding: '0 25px', flex: 1 }}>
                    <Col style={{ flexDirection: 'column', display: 'flex' }}>
                        <>
                            {/* <textarea style={{height:'100%', margin:'20px'}} id={'json-field'} defaultValue={JSON.stringify(validationForm, null, 2)} onChange={(event) => {
                                if(textareaTimeout) {
                                    clearTimeout(textareaTimeout)
                                }
                                textareaTimeout = setTimeout(() => {
                                    try {
                                        const validationJson = JSON.parse(event.target.value)
                                        console.log('setValidationForm', validationJson)
                                        setValidationForm(validationJson)
                                    } catch (e) {
                                        console.log('Unvalid json', event.target.value)
                                    }
                                }, 1000)


                            }
                            }></textarea> */}
                            <div style={{ marginRight: -20, marginLeft: -25 }}>
                                <CodeMirror
                                    className="CodeMirror"
                                    id="editor"
                                    value={JSON.stringify(validationForm, null, 2) || ""}
                                    height="100%"
                                    theme={"dark"}
                                    extensions={[json()]}
                                    onChange={(val: any) => {
                                        if (textareaTimeout) {
                                            clearTimeout(textareaTimeout)
                                        }
                                        textareaTimeout = setTimeout(() => {
                                            try {
                                                const validationJson = JSON.parse(val)
                                                console.log('setValidationForm', validationJson)
                                                setValidationForm(validationJson)
                                            } catch (e) {
                                                console.log('Unvalid json', val)
                                            }
                                        }, 1000)
                                    }}
                                />
                            </div>
                        </>
                    </Col>

                    {
                        (<Col
                            style={{
                                maxWidth: 620,
                                background: '#282c34',
                                marginRight: -25,
                                display: 'flex',
                                flexDirection: 'column',
                                alignSelf: 'flex-start',
                                height: 'calc(100vh - 50px)',
                                position: 'sticky',
                                top: 0,
                                zIndex: 5,
                            }}
                        >
                            <NotificationDetail notification={{}} onClose={() => onValidationClose()} isDebug={true} validationJson={validationForm} />
                        </Col>)
                    }
                </Flex>
            </Layout>
        </>
    )
}

export default MOTest
