import { useNavigate, useLocation } from "react-router-dom";

export const useNavigateToExplorer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToExplorer = (notificationId?: string) => {
    if (notificationId) {
      navigate({ pathname: `/explorer/${notificationId}`, search: location.search });
    } else {
      navigate({ pathname: `/explorer`, search: location.search });
    }
  };

  return { navigateToExplorer };
};
