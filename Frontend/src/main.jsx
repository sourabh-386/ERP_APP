import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Loader from './Sub_component/Reused_comp/Loder/Loader.jsx';
import { Provider } from 'react-redux'
import { Store } from './Reducer/Store/Store.js';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <Provider store={Store}>
          {/* <Loader/> */}
          <App />
        </Provider>
      </BrowserRouter>

    </QueryClientProvider>

  </React.StrictMode>,
)
