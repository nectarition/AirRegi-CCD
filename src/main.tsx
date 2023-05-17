import React from 'react'
import ReactDOM from 'react-dom/client'

import ResetStyle from './styles/ResetStyle.tsx'
import GlobalStyle from './styles/GlobalStyle.tsx'
import Color from './styles/Color.tsx'

import App from './pages/App.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ResetStyle />
    <Color />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
)
