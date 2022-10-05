import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/application-service";
import Application from "../../data/interfaces/application"
import "./Sidebar.scss";

export const Sidebar: React.FC = () => {
  
  const [applications, setApplications] = useState<Application[]>();

  useEffect(() => {
    (async () => {
      const applications: Application[] = await getApplications();
      setApplications(applications);
    })();
  }, []);

  return (
    <>
      {applications && applications.map((application, index) => 
        <h1 key={index}>{application.title}</h1>
      )}
    </>
  );
};

export default Sidebar;
