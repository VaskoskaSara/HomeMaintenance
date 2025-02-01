import EmployeeBookingMngm from "../pages/EmployeeBookingMngm/EmployeeBookingMngm";
import ViewBookings from "../pages/ViewBookings/ViewBookings";

const privateRoutes = [
  {
    path: "/manage-bookings",
    element: <EmployeeBookingMngm />,
    allowedRoles: [2,3],
  },
  {
    path: "/view-bookings",
    element: <ViewBookings />,
    allowedRoles: [1, 2], 
  },
];

export default privateRoutes;
