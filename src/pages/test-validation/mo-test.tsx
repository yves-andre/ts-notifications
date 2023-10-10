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
        "image": "https://picsum.photos/id/1005/40/40",
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
                        "title": "Image 1",
                        "url": "https://picsum.photos/id/1011/400/250",
                        "type": "image",
                      },
                      {
                        "title": "Image 2",
                        "url": "https://picsum.photos/id/1010/700/250",
                        "type": "image",
                      },
                      {
                        "title": "Image 3",
                        "url": "https://picsum.photos/id/1012/500/450",
                        "type": "image",
                      }
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
                        "type": "date",
                        "label": "Date",
                        "value": "21 Oct. 2022"
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
                  },
                  {
                    "type": "footerBlock",
                    "items": [
                      {
                        "type": "rulesValidationButton",
                        "label": "Comment Check",
                        "color": "orange",
                        "icon": "outline/stop",
                        "validationValue": false,
                        "validatedConfig": {
                          "label": "Comment checked",
                          "icon": "filled/check-square",
                          "color": "green"
                        }
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
                        "title": "Image 1",
                        "url": "https://picsum.photos/id/1011/400/250",
                        "type": "image",
                      },
                      {
                        "title": "Image 2",
                        "url": "https://picsum.photos/id/1010/700/250",
                        "type": "image",
                      },
                      {
                        "title": "Image 3",
                        "url": "https://picsum.photos/id/1012/500/450",
                        "type": "image",
                      }
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
                        "type": "date",
                        "label": "Date",
                        "value": "21 Oct. 2022"
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
                  },
                  {
                    "type": "footerBlock",
                    "items": [
                      {
                        "type": "rulesValidationButton",
                        "label": "Comment Check",
                        "color": "orange",
                        "icon": "outline/stop",
                        "validationValue": false,
                        "validatedConfig": {
                          "label": "Comment checked",
                          "icon": "filled/check-square",
                          "color": "green"
                        }
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
                    "type": "slideshow",
                    "slides": [
                      {
                        "title": "Image 1",
                        "url": "https://picsum.photos/id/1011/400/250"
                      },
                      {
                        "title": "Image 2",
                        "url": "https://picsum.photos/id/1010/700/250"
                      },
                      {
                        "title": "Image 3",
                        "url": "https://picsum.photos/id/1012/500/450"
                      }
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
                        "type": "date",
                        "label": "Date",
                        "value": "21 Oct. 2022"
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
                  },
                  {
                    "items": [
                      {
                        "type": "rulesValidationButton",
                        "label": "Comment Check",
                        "color": "orange",
                        "icon": "outline/stop",
                        "validationValue": false,
                        "validatedConfig": {
                          "label": "Comment checked",
                          "icon": "filled/check-square",
                          "color": "green"
                        }
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
                        "image": "https://picsum.photos/id/1005/40/40",
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
                        "image": "https://picsum.photos/id/1005/40/40",
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
