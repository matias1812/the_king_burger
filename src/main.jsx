import { BrowserRouter } from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
