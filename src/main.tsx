import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Home from './components/home/Home.tsx'
import './index.css'
import { store } from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
)
