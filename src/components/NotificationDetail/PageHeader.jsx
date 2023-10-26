import Page from "./Page";

// {
//   "type": "pageHeader",
//   "icon": "missionOrder",
//   "title": "Travel Details",
// }

const PageHeader = ({icon, title}) => {
  return (
    <Page.Header icon={icon} title={title} />
  )
}

export default PageHeader;