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
  "validationRules": {
    "item1": {
      "isMandatory": true,
      "errorMessage": "You must check the comment of 'Public Transport' before approving this item.",
      "value": false,
      "valid": {
        "color": "green",
        "icon": "check"
      },
      "invalid": {
        "color": "orange",
        "icon": "warning"
      }
    }
  },
  "template": {
    "color": "corporate/lightBlue",
    "gradient": "corporate/lightBlue",
    "items": [
      {
        "type": "headerBlock",
        "title": "Alexandra DE LA VILLARDIERE",
        "subtitle": "2022.10.10 - Marseille - LNG Carrier Training",
        "image": "https://picsum.photos/id/1005/40/40",
        "total": "590.00 CHF",
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
        "title": "Expense",
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
        "title": "Details",
        "subtitle": "",
        "items": [
          {
            "type": "listBlock",
            "listItems": [
              {
                "title": "Public Transport",
                "validationKey": "item1",
                "subtitle": "Transportation | 10 Oct 2022",
                "image": "https://picsum.photos/id/1008/500/700",
                "value": "4.55 CHF",
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
                        "validationKey": "item1",
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
                "title": "Dinner",
                "subtitle": "Subsistance | 10 Oct 2022",
                "image": "https://picsum.photos/id/1009/40/40",
                "value": "52.00 CHF",
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
                "title": "Taxi",
                "subtitle": "Transportation | 10 Oct 2022",
                "image": "https://picsum.photos/id/1010/40/40",
                "value": "31.00 CHF",
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
              },
              {
                "title": "Hotel Golden Tulio Villa",
                "subtitle": "Hotel | 10 Oct 2022",
                "image": "https://picsum.photos/id/1011/40/40",
                "value": "210.00 CHF",
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
                "title": "Coffee",
                "subtitle": "Subsistance | 10 Oct 2022",
                "image": "https://picsum.photos/id/1012/60/40",
                "value": "6.55 CHF",
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
                "label": "Projet",
                "value": "Business Excellence"
              },
              {
                "label": "Mission Order",
                "value": "MO1234554432 - Marseille LNG Carrier Training",
                "href": "https://applications.dts.corp.local/missionorder/123456789"
              },
              {
                "label": "Training",
                "value": "NA",
                "isEmpty": true
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
                "title": "Employee Details",
                "subtitle": "Alexandra DE LA VILLARDIERE",
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
              "commentMandatory": true
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

export const ExpenseTest: React.FC = () => {
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

export default ExpenseTest
