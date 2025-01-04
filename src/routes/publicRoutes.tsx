import HomePage from "src/pages/HomePage/HomePage";
import { Route } from "./routeTypes";
import Services from "src/pages/Services/Services";
import ServiceDetails from "src/pages/ServiceDetails/ServiceDetails";
import NeedAuthorizationPage from "src/pages/AuthorisationPage";

const publicRoutes: Route[] = [
    { path: "/", element: <HomePage /> },
    { path: "/services", element: <Services /> },
    { path: "/services/:id", element: <ServiceDetails /> },
    { path: "/need-authorisation", element: <NeedAuthorizationPage /> }
  ];

export default publicRoutes;
