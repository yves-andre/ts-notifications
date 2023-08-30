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
import { APP_CONFIG } from "../../data/app-config";
import {
  closeNotificationToValidate,
  fetchNotifications,
  selectNotificationById,
} from "../../store/notifications-slice";
import { useSelector } from "react-redux";
import { getTitleByCategory } from "../../pages/menu/menu-service";

const userProfile = {};

export const Page: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [hasValidation, setHasValidation] = React.useState(false);
  const notification = useSelector(
    selectNotificationById(params.notificationId)
  );

  const selectedCategory = useAppSelector(
    (state) => state.filters.selectedCategory
  );

  useEffect(() => {
    if (!notification) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, notification]);

  const totalLogo =
    process.env.NODE_ENV !== "development"
      ? APP_CONFIG.THEME_ASSETS.totalLogo
      : "https://www.totalenergies.fr/typo3conf/ext/de_site_package/Resources/Public/Dist/Images/Logo/totalenergies--vertical.svg";

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
  const notificationsToValidate = useAppSelector(
    (state) => state.notifications.notificationsToValidate
  );

  const previousNotificationsRef = useRef(notificationsToValidate);

  useEffect(() => {
    const previous = previousNotificationsRef.current;
    const newlyOpened = notificationsToValidate.find(n => n.opened && !previous.find(pn => pn.id === n.id)?.opened);
    previousNotificationsRef.current = notificationsToValidate;
    if (newlyOpened) {
      navigate({pathname: `/explorer/${newlyOpened.id}`, search: location.search});
    }
  }, [notificationsToValidate]);

  const onValidationClose = (closedId: string) => {
    dispatch(closeNotificationToValidate(closedId))
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
              settingsAction={() => {}}
              rainbow={true}
              items={[
                {
                  key: "notifications",
                  title: "Trading Notifications",
                  onClick: () => {},
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
                />
              )}
            </>
          </LocalNav>
        </Layout.Nav>

        {/* NAVIGATION 2nd LEVEL --------------------------------------------*/}
        <Layout.Sidebar style={{ background: "white" }}>
          <Layout.SidebarHeader>
            <h3 style={{ textTransform: "uppercase" }}>
              {getTitleByCategory(selectedCategory)}
            </h3>
            <IconButton
              icon="crossCancel50"
              round
              color="ultraLightGray"
              style={{ marginLeft: "auto" }}
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

          {hasValidation && (
            <Col
              style={{
                maxWidth: 410,
                background: "white",
                marginRight: -25,
                display: "flex",
                flexDirection: "column",
                alignSelf: "flex-start",
                height: "calc(100vh - 50px)",
                position: "sticky",
                top: 0,
                zIndex: 5,
              }}
            >
              <NotificationDetail
                notification={notification}
                onClose={(id: string) => onValidationClose(id)}
              />
            </Col>
          )}
        </Flex>
      </Layout>
    </>
  );
};

export default Page;
