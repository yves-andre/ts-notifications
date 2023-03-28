import { useCallback, useEffect, useRef } from "react";
import { getUserLogin } from "../services/auth-service";
import useWebSocket from "react-use-websocket";
/**
 * A React hook that establishes a WebSocket connection and reconnects automatically
 * if the connection is lost. The WebSocket URL is obtained dynamically using a
 * function that returns a Promise. The hook uses the react-use-websocket library to
 * handle the WebSocket connection and automatically reconnects with a random delay
 * between 0 and 1 second if the connection is lost.
 *
 * @returns The last message received from the WebSocket server, or undefined if no
 * message has been received yet.
 */
export const useAppWebSocket = () => {
  const getSocketUrl = useCallback(() => {
    return new Promise((resolve) => {
      getUserLogin().then((response) => {
        resolve((process.env.REACT_APP_WS_URL as string).replace("{LOGIN}", response));
      });
    });
  }, []) as () => Promise<string>;

  const reconnectTimeoutRef = useRef<number>();
  const { lastMessage, readyState, sendMessage } = useWebSocket(getSocketUrl, {
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (readyState === 3) { // readyState of 3 indicates a closed connection
      // Log the lost connection
      console.warn("WebSocket connection lost, attempting to reconnect...");
      // Reconnect after a random wait period between 1 and 5 minutes
      const reconnectTimeout = Math.floor(Math.random() * 300000) + 60000;
      reconnectTimeoutRef.current = window.setTimeout(() => {
        sendMessage(""); // Send an empty message to trigger reconnection
      }, reconnectTimeout);
    }
    return () => {
      window.clearTimeout(reconnectTimeoutRef.current);
    };
  }, [readyState, sendMessage]);

  return lastMessage;
};