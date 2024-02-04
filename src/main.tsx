import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

import { worker } from './api/server'
import store from "./store";
import {extendedApiSlice} from "./store/features/users/usersSlice.ts";

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <App />
  )
}

start()
