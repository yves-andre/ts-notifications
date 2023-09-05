import React, { useEffect, useState, useRef } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Layout,
  Header,
  LocalNav,
  Flex,
  Col,
  IconButton,
} from "@trading/energies-ui";
import { Topbar } from "../../pages/topbar/Topbar";
import { Sidebar } from "../../pages/sidebar/Sidebar";
import { Menu } from "../../pages/menu/Menu";

import Application from "../../data/interfaces/application";
import CategoryColor from "../../data/interfaces/category-color";
import { useAppSelector } from "../../hooks/use-app-selector";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import {
  fetchApplications,
  fetchCategoryColors,
} from "../../store/applications-slice";
import NotificationDetail from "../../components/NotificationDetail";
import "./Page.scss";
import './Page.scss'
import { APP_CONFIG } from '../../data/app-config'
import { fetchNotificationCounts, fetchNotificationsByStatusAndCategory, selectNotificationById } from "../../store/notifications-slice";
import { useSelector } from "react-redux";
import { getTitleByCategory } from "../../pages/menu/menu-service";
import { useRouteFilters } from '../../hooks/use-route-filters'
import { FILTER } from '../../data/constants/filter'


const userProfile = {}

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [hasValidation, setHasValidation] = React.useState(false)
  const [sidebar, setSidebar] = React.useState(true)
  const notification = useSelector(selectNotificationById(params.notificationId));
  const searchParams = useRouteFilters();

  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );

  useEffect(() => {
    // get the current category and status from the url
    const selectedCategory = +(
      searchParams?.get(FILTER.SELECTED_CATEGORY) || "0"
    );
    const selectedStatus = +(
      searchParams?.get(FILTER.SELECTED_STATUS) || "1"
    );
    dispatch(fetchNotificationsByStatusAndCategory(selectedStatus, selectedCategory));
  }, [dispatch, notification, searchParams]);

  // fetch the counts only on startup. (other calls are made on WS update in App.tsx)
  useEffect(() => {
    dispatch(fetchNotificationCounts());
  }, []);

  const totalLogo =
    process.env.NODE_ENV !== 'development'
      ? APP_CONFIG.THEME_ASSETS.totalLogo.replace("{0}", process.env.REACT_APP_API_SP_RESSOURCES_URL as string)
      : 'https://www.totalenergies.fr/typo3conf/ext/de_site_package/Resources/Public/Dist/Images/Logo/totalenergies--vertical.svg'


  useEffect(() => {
    document.querySelector(".svg-gradient")?.remove();
    document.querySelector(".svg-gradient-styles")?.remove();
  }, []);

  const applications: Application[] = useAppSelector(
    (state) => state.applications.applications
  );
  const categoryColors: CategoryColor[] = useAppSelector(
    (state) => state.applications.categoryColors
  );

  const onValidationClose = () => {
    navigate({ pathname: `/explorer`, search: location.search });
  };

  useEffect(() => {
    setHasValidation(!!notification);
  }, [notification]);

  // Load the applications and colors
  useEffect(() => {
    (async () => {
      dispatch(fetchCategoryColors());
      dispatch(fetchApplications());
    })();
  }, []);

  const menuIsReady = applications.length > 0 && !!categoryColors;

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
          {
            <Header
              userProfile={userProfile}
              style={
                {
                  "--ts-global-theme": "var(--ts-color-corporate-red)",
                  "--ts-global-theme-dark":
                    "var(--ts-color-corporate-red-dark)",
                  "--ts-global-gradient-button":
                    "var(--ts-gradient-corporate-red-button)",
                } as React.CSSProperties
              }
              logo={totalLogo}
              variant="default"
              active="notifications"
              onChange={(key: any) => console.log(key)}
              settingsAction={() => { }}
              rainbow={true}
              items={[
                {
                  key: "notifications",
                  title: "Trading Notifications",
                  onClick: () => { },
                },
                {
                  key: "dwp",
                  title: "T&S Digital Workplace",
                  onClick: () => {
                    window.location.replace(window.location.origin);
                  },
                },
              ]}
            ></Header>
          }
        </Layout.Header>

        {/* NAVIGATION 1st LEVEL --------------------------------------------*/}
        <Layout.Nav>
          <LocalNav>
            <>
              {menuIsReady && (
                <Menu
                  applications={applications}
                  categoryColors={categoryColors}
                  sidebar={sidebar}
                  onClick={() => { setSidebar(true) }}
                />
              )}
            </>
          </LocalNav>
        </Layout.Nav>

        {/* NAVIGATION 2nd LEVEL --------------------------------------------*/}
        <Layout.Sidebar style={{ background: "white" }} open={sidebar}>
          <Layout.SidebarHeader>
            <h3 style={{ textTransform: "uppercase" }}>
              {getTitleByCategory(selectedCategory)}
            </h3>
            <IconButton
              icon="crossCancel50"
              round
              color="ultraLightGray"
              style={{ marginLeft: "auto" }}
              onClick={() => setSidebar(!sidebar)}
            >
              Close
            </IconButton>
          </Layout.SidebarHeader>
          {menuIsReady && (
            <Sidebar
              applications={applications}
              categoryColors={categoryColors}
            />
          )}
        </Layout.Sidebar>

        {/* CONTENT ---------------------------------------------------------*/}
        <Flex style={{ padding: "0 25px", flex: 1 }}>
          <Col style={{ flexDirection: "column", display: "flex" }}>
            <>
              <Topbar />
              <Outlet />
            </>
          </Col>


          <Col
            style={{
              maxWidth: 620,
              background: "white",
              marginRight: -25,
              display: "flex",
              flexDirection: "column",
              alignSelf: "flex-start",
              height: "calc(100vh - 50px)",
              position: "sticky",
              top: 0,
              zIndex: 5,
              flexGrow: hasValidation ? 1 : 0,
              transition: 'flex 150ms ease-in-out'
            }}
          >
            <>
              {hasValidation && (
                <NotificationDetail
                  notification={notification}
                  onClose={() => onValidationClose()}
                />
              )}
            </>
          </Col>
        </Flex>
      </Layout>
    </>
  );
};

export default Page;
