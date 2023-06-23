import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { CognitoProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

Amplify.configure({
  Auth: {
    region: 'ap-southeast-1',
    userPoolId: 'ap-southeast-1_PM3JVJmks',
    userPoolWebClientId: '4ra9bnfrm2vf3mf2v1e5helra5',
  },
});

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <CognitoProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <RouterProvider router={App} />
    </CognitoProvider>
  </StrictMode>,
);
