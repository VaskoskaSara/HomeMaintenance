import  { Suspense } from "react";
import { Routes, Route, BrowserRouter as  Router } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Services from "../../pages/Services/Services";
import ServiceDetails from "../../pages/ServiceDetails/ServiceDetails";
import RegisterPage from "src/pages/RegisterPage/RegisterAndLoginPage";
import EmployeeBookingMngm from "src/pages/EmployeeBookingMngm/EmployeeBookingMngm";

const AppRoutes: () => JSX.Element = () => {
    
    return(
            <Router basename="">
                <Suspense fallback={<>Loader</>}>
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetails />} />
                    <Route path={"/login"} element={<RegisterPage />} />
                    <Route path={"/register"} element={<RegisterPage />} />
                    <Route path={"/manage-bookings"} element={<EmployeeBookingMngm />} />
                    </Routes>
                </Suspense>
            </Router>
    );
}

export default AppRoutes;