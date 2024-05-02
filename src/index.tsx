import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import reportWebVitals from './reportWebVitals';
import AppWrapper from './app-config/AppWrapper';
import { SWRConfig } from 'swr';
import { fetcher } from './api/apiQuery';

const root = createRoot(document.getElementById("root")!); // createRoot(container!) if you use TypeScript

root.render(  <StrictMode>
<SWRConfig 
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }} >
                <AppWrapper />
                </SWRConfig>
              </StrictMode>);


reportWebVitals(console.log);
