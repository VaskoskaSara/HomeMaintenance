import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import { BookingMng } from "../EmployeeBookingMngm/EmployeeBookingMng.types";

export function getBookingsByUser(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: bookings, isLoading, mutate } = useSWR<ApiResponse<BookingMng[]>>(
    `/api/booking/user/${id}/bookings`,
    getFetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return { bookings, isLoading, mutate };
}

export type NotificationDto = {
  employeeName: string;
  employeeId: string;
  paymentId: string;
};
