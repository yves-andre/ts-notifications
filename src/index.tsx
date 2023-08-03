import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { APP_CONFIG } from "./data/app-config";
import { Theme } from "@trading/energies-ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const environmentAssets =
  process.env.NODE_ENV !== "local" ? APP_CONFIG.THEME_ASSETS : undefined;

root.render(
  <Theme
    color={APP_CONFIG.APP_COLOR}
    assets={environmentAssets}
    fonts={APP_CONFIG.THEME_FONTS}
    legacyBranding={true}
    darkMode={true}
  >
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </Theme>
);
