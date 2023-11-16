import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Header, Flex, Col } from '@trading/energies-ui'
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
        "subtitle": "#MO02992011",
        "items": [
          {
            "type": "fromToDate",
            "labelFrom": "Leaving",
            "labelTo": "Returning",
            "dateFormat": "DD MMM. YYYY",
            "fromDate": "09 Nov. 2023",
            "toDate": "10 Nov. 2023"
          }
        ]
      },
      {
        "type": "sectionBlock",
        "title": "Travel Details",
        "subtitle": "Travel Details",
        "items": [
          {
            "type": "listBlock",
            "listItems": [
              {
                "title": "Flight Genève Bruxelles",
                "subtitle": "09 Nov. 2023 - 08:35",
                "items": [
                  {
                    "type": "pageHeader",
                    "title": "Line Details"
                  },
                  {
                    "type": "title",
                    "title": "Flight Genève Bruxelles"
                  },
                  {
                    "type": "sectionBlock",
                    "items": [
                      {
                        "type": "fromToDate",
                        "labelFrom": "Departure",
                        "labelTo": "Arrival",
                        "dateFormat": "DD MMM. YYYY - HH:mm",
                        "fromDate": "09 Nov. 2023 - 08:35",
                        "toDate": "09 Nov. 2023 - 10:00"
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
                            "label": "Company / Airline",
                            "value": "SN"
                          },
                          {
                            "label": "Flight / Train Number",
                            "value": "2712"
                          },
                          {
                            "label": "Accommodation",
                            "value": "Sofitel"
                          },
                          {
                            "label": "Accommodation Cost",
                            "value": "249 CHF"
                          },
                          {
                            "label": "Comment",
                            "value": "NA",
                            "isEmpty": true
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "title": "Flight Bruxelles Genève",
                "subtitle": "10 Nov. 2023 - 07:05",
                "items": [
                  {
                    "type": "pageHeader",
                    "title": "Line Details"
                  },
                  {
                    "type": "title",
                    "title": "Flight Bruxelles Genève"
                  },
                  {
                    "type": "sectionBlock",
                    "items": [
                      {
                        "type": "fromToDate",
                        "labelFrom": "Departure",
                        "labelTo": "Arrival",
                        "dateFormat": "DD MMM. YYYY - HH:mm",
                        "fromDate": "09 Nov. 2023 - 08:35",
                        "toDate": "09 Nov. 2023 - 10:00"
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
                            "label": "Company / Airline",
                            "value": "SN"
                          },
                          {
                            "label": "Flight / Train Number",
                            "value": "2712"
                          },
                          {
                            "label": "Accommodation",
                            "value": "Sofitel"
                          },
                          {
                            "label": "Accommodation Cost",
                            "value": "249 CHF"
                          },
                          {
                            "label": "Comment",
                            "value": "NA",
                            "isEmpty": true
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
                "value": "NA",
                "isEmpty": true
              },
              {
                "label": "Counterparty(ies)",
                "value": "Empica; MetaFactory"
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
                "title": "Other Informations",
                "subtitle": "Travel Agent, ...",
                "icon": "missionOrder",
                "items": [
                  {
                    "type": "pageHeader",
                    "icon": "missionOrder",
                    "title": "Travel Details"
                  },
                  {
                    "type": "sectionBlock",
                    "title": "Informations",
                    "display": "inline",
                    "subtitle": "",
                    "items": [
                      {
                        "type": "dataList",
                        "display": "block",
                        "data": [
                          {
                            "label": "Travel Agent",
                            "value": "Value",
                            "isEmpty": true
                          },
                          {
                            "label": "External ID",
                            "value": "1426961121"
                          },
                          {
                            "label": "Transport Cost Comment",
                            "value": "Lorem Ipsum Hello"
                          },
                          {
                            "label": "Related to an expatriation",
                            "value": "No"
                          },
                          {
                            "label": "Created by",
                            "value": "Alain PROBST"
                          }
                        ]
                      }
                    ]
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
                "subtitle": "3 Activities",
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
