import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import AppWrapper from './app-config/AppWrapper';
import './index.css';

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript

root.render(  <StrictMode>
                <AppWrapper />
              </StrictMode>);


reportWebVitals(console.log);
