import useSWR from "swr";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import { getFetcher } from "src/api/apiQuery";

const EmployeeBookingMngm: React.FC = ({}) => {

    const id = localStorage.getItem("loggedUserId");

    const { data: employee, isLoading } = useSWR<ApiResponse<any>>(
        `/api/user/manage-bookings/${id}`, getFetcher,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );


    return (<p>sara</p>);
};

export default EmployeeBookingMngm;