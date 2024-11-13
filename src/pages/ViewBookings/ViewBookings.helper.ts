import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import { BookingMng } from "../EmployeeBookingMngm/EmployeeBookingMng";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";

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

export type NotificationDto = {
  employeeName: string;
  employeeId: string;
  paymentId: string;
};
