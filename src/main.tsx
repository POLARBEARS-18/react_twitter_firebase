import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { Provider } from 'react-redux'
import { store } from 'app/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
