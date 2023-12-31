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

let environmentAssets;

if (process.env.NODE_ENV !== "local") {
  environmentAssets = Object.fromEntries(
    Object.entries(APP_CONFIG.THEME_ASSETS).map(([key, value]) => [
      key,
      (value as string).replace(
        "{0}",
        process.env.REACT_APP_API_SP_RESSOURCES_URL as string
      ),
    ])
  );
}

root.render(
  <Theme
    color={APP_CONFIG.APP_COLOR}
    gradient={APP_CONFIG.APP_GRADIENT}
    assets={environmentAssets}
    fonts={APP_CONFIG.THEME_FONTS.map((f: string) =>
      f.replace("{0}", process.env.REACT_APP_API_SP_RESSOURCES_URL as string)
    )}
    legacyBranding={false}
  >
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </Theme>
);
