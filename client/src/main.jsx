import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import AuthContextProvider from './context/AuthContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </Provider>
)
