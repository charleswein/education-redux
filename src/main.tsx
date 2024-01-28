import { createRoot } from 'react-dom/client'

import App from './App'

import './index.css'

import { worker } from './api/server'
import {fetchUsers} from "./store/features/users/usersSlice.ts";
import store from "./store";

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  store.dispatch(fetchUsers())

  const root = createRoot(document.getElementById('root')!)

  root.render(
    <App />
  )
}

start()
