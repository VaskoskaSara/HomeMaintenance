import  { Suspense } from "react";
import { Routes, Route, BrowserRouter as  Router } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import Services from "../../pages/Services/Services";
import ServiceDetails from "../../pages/ServiceDetails/ServiceDetails";
import RegisterPage from "src/pages/RegisterPage/RegisterAndLoginPage";

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
                    </Routes>
                </Suspense>
            </Router>
    );
}

export default AppRoutes;