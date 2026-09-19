import { StrictMode } from 'react' // named export - help to find potential problems in an application
import { createRoot } from 'react-dom/client' // named export - used to create a root for rendering the React application, separated from the main React library for better performance and flexibility
import './index.css' // side-effect import
import App from './App.tsx' // default export - main component of the application, imported from the App.tsx file

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render( 
  // createRoot is a function that creates a root for rendering the React application, taking the DOM element with the id 'root' as an argument. The exclamation mark (!) is a TypeScript non-null assertion operator, indicating that the element will not be null.
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
