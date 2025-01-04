import EmployeeBookingMngm from "../pages/EmployeeBookingMngm/EmployeeBookingMngm";
import ViewBookings from "../pages/ViewBookings/ViewBookings";

const privateRoutes = [
  {
    path: "/manage-bookings",
    element: <EmployeeBookingMngm />,
    allowedRoles: [3],
  },
  {
    path: "/view-bookings",
    element: <ViewBookings />,
    allowedRoles: [2], 
  },
];

export default privateRoutes;
