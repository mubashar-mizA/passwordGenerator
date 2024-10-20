import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import PasswordGenerator from './PasswordGenerator'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PasswordGenerator/>
  </StrictMode>,
)
