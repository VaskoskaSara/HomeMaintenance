import  { Suspense } from "react";
import { Routes, Route, BrowserRouter as  Router } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Services from "../../pages/Services/Services";
import ServiceDetails from "../../pages/ServiceDetails/ServiceDetails";
import RegisterPage from "src/pages/RegisterPage/RegisterAndLoginPage";
import EmployeeBookingMngm from "src/pages/EmployeeBookingMngm/EmployeeBookingMngm";
import { useAuth } from "src/pages/common/AuthContext";

const AppRoutes: () => JSX.Element = () => {
    const { isAuthenticated } = useAuth();

    return(
            <Router basename="">
                <Suspense fallback={<>Loader</>}>
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/services/:id" element={<ServiceDetails />} />
                    <Route path={"/login"} element={!isAuthenticated ? <RegisterPage/> : <HomePage />} />
                    <Route path={"/register"} element={!isAuthenticated ? <RegisterPage/> : <HomePage />} />
                    <Route path={"/manage-bookings"} element={isAuthenticated ? <EmployeeBookingMngm /> : <HomePage />} />
                    </Routes>
                </Suspense>
            </Router>
    );
}

export default AppRoutes;