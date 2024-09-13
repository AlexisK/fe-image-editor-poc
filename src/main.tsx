import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";

import App from './App.tsx'
import './index.css'
import { router } from './pages';
import { QueryDataContextProvider } from './contexts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryDataContextProvider>
        <App>
            <RouterProvider router={router} />
        </App>
    </QueryDataContextProvider>
  </StrictMode>,
)
