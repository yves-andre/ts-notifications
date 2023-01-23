import { useCallback } from "react";
import { getUserLogin } from "../services/auth-service";
import useWebSocket from "react-use-websocket";

export const useAppWebSocket = () => {
  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      getUserLogin().then((response) => {
        resolve((process.env.REACT_APP_WS_URL as string).replace("{LOGIN}", response));
      });
    });
  }, []) as () => Promise<string>;

  // Opening the websocket connexion
  // using an async socket url string resolution function
  const { lastMessage } = useWebSocket(getSocketUrl, {
    shouldReconnect: (closeEvent) => true,
  });

  return lastMessage;
}