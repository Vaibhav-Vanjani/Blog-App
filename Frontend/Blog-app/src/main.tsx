import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppwriteContextProvider from './context/AppwriteContext.tsx'
import BlogContextProvider from './context/BlogContext.tsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppwriteContextProvider>
      <BlogContextProvider>
        <BrowserRouter>
             <App />
         </BrowserRouter>
      </BlogContextProvider>
    </AppwriteContextProvider>
  </StrictMode>,
)
