import useSWR from "swr";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import { BookingMng } from "../EmployeeBookingMngm/EmployeeBookingMng";
import { getFetcher } from "src/api/apiQuery";

export function getBookingsByUser(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: bookings, isLoading } = useSWR<ApiResponse<BookingMng[]>>(
    `/api/user/view-bookings/${id}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { bookings, isLoading };
}
