import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import CountryList from './components/countryList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CountryList />
  </StrictMode>,
)
