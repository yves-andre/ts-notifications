import { useEffect, useState } from "react";
const audio = new Audio(`${process.env.REACT_APP_API_SP_RESSOURCES_URL}/tsf/assets/sounds/notification.mp3`);
const badgeFavicon = `${process.env.REACT_APP_API_SP_RESSOURCES_URL}/tsf/assets/images/svg/favicon_bell_badge.svg`;
const originalFavicon = `${process.env.REACT_APP_API_SP_RESSOURCES_URL}/tsf/assets/images/svg/favicon_bell.svg`;
export function useTabNotifications(
  actionCount: number,
  informationCount: number
) {
  const [prevActionCount, setPrevActionCount] = useState(actionCount);
  const [prevInformationCount, setPrevInformationCount] = useState(informationCount);
  useEffect(() => {
    const handleAudioEnd = () => {
      audio.currentTime = 0;
    };
    audio.addEventListener("ended", handleAudioEnd);
    return () => {
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);
  const showFaviconBadge = (showBadge: boolean) => {
    // Query all favicon elements
    const favicons = document.querySelectorAll(
      'link[rel="icon"]'
    ) as any as any[];
    // Iterate over the NodeList and set the new href attribute for each favicon
    favicons.forEach((favicon) => {
      favicon.href = showBadge ? badgeFavicon : originalFavicon;
    });
  };
  useEffect(() => {
    if (
      actionCount > prevActionCount ||
      informationCount > prevInformationCount
    ) {
      audio.play().catch((error) => {
        console.error("Error playing the audio:", error);
      });
    }
    setPrevActionCount(actionCount);
    setPrevInformationCount(informationCount);
    showFaviconBadge(actionCount > 0 || informationCount > 0);
    let titleCount = "";
    if (actionCount > 0 && informationCount > 0) {
      titleCount = `(${actionCount} | ${informationCount})`;
    } else if (actionCount > 0) {
      titleCount = `(${actionCount})`;
    } else if (informationCount > 0) {
      titleCount = `(${informationCount})`;
    }
    document.title =
      titleCount + (titleCount ? " " : "") + "Trading Notifications";
  }, [actionCount, informationCount]);
}