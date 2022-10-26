import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import { APP_CONFIG } from './data/app-config'
import { Theme } from '@trading/energies-ui'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Theme
    color={APP_CONFIG.APP_COLOR}
    assets={APP_CONFIG.THEME_ASSET}
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
)
