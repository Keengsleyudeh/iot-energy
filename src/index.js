import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { SaasProvider } from '@saas-ui/react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import theme from './theme';
import Root from './routes/root';
import ErrorPage from './error-page';
import Signup from './routes/auth/signup';
import Signin from './routes/auth/signin';
import AddMeter from './routes/auth/addMeter';
import './Utils/Firebase';
import AppRoot from './routes/Dashboard/root';
import Home from './routes/Pages/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/signup",
        element: <Signup />
      },
      {
        path: "auth/signin",
        element: <Signin />
      },
      {
        path: "dashboard",
        element: <AppRoot />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "add-meter",
            element: <AddMeter />
          }
        ]
      }
    ]
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SaasProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </SaasProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
