import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './style.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <BrowserRouter basename="/task-manager">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
