import { eachDayOfInterval, format } from "date-fns";
import { BookingMng } from "./EmployeeBookingMng";
import { getFetcher } from "src/api/apiQuery";
import useSWR from "swr";
import { ApiResponse } from "../RegisterPage/RegisterPage.props";
import dayjs from "dayjs";
import { message } from "antd";

export const columns = [
  {
    title: "Image",
    dataIndex: "avatar",
    render: (text: any) => (
      <img src={text} alt="profile" style={{ width: 100, height: 100 }} />
    ),
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Price",
    dataIndex: "amount",
    render: (text: any) => `$${text.toFixed(2)}`, // Format price
  },
  {
    title: "Start Date/Time",
    dataIndex: "startDateTime",
    render: (text: string) =>
      `${new Date(text).toLocaleDateString()} ${new Date(
        text
      ).toLocaleTimeString()}`,
  },
  {
    title: "End Date/Time",
    dataIndex: "endDateTime",
    render: (text: string) =>
      `${new Date(text).toLocaleDateString()} ${new Date(
        text
      ).toLocaleTimeString()}`,
  },
];

export const colors = [
  { name: "Non-booked days", color: "green" },
  { name: "Booked days", color: "red" },
];

export function setBookedDays(
  setAvailability: React.Dispatch<any>,
  employee: ApiResponse<BookingMng[]>
) {
  var booked: string[] = [];
  employee.data.forEach((item: BookingMng) => {
    const startDate = new Date(item.startDateTime);
    const endDate = new Date(item.endDateTime);

    const dateRange = eachDayOfInterval({
      start: startDate,
      end: endDate,
    }).map((date) => format(date, "yyyy-MM-dd"));

    booked.push(...dateRange);
  });

  setAvailability((prev: any) => ({
    ...prev,
    booked_dates: [...prev.booked_dates, ...booked],
  }));
}

export function setDisabledDays(
  setAvailability: React.Dispatch<any>,
  data: Date[]
) {
  setAvailability((prev: any) => ({
    ...prev,
    disabled_dates: data,
  }));
}

export function getBookings(id: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: bookings, isLoading } = useSWR<ApiResponse<BookingMng[]>>(
    `/api/user/manage-bookings/${id}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { bookings, isLoading };
}

export function getDisabledDates(id: string) {
  const { data: employeeDisabledDates, isLoading: isLoadingDisabledDates } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useSWR<ApiResponse<Date[]>>(
      `/api/user/manage-bookings/disabled-dates/${id}`,
      getFetcher,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }
    );

  return { employeeDisabledDates, isLoadingDisabledDates };
}

export const checkForBooked = (
  stringList: string[],
  dayJsList: dayjs.Dayjs[]
): boolean => {
  const dayJsSet = new Set(dayJsList.map((date) => date.format("YYYY-MM-DD")));
  if (stringList.some((dateStr) => dayJsSet.has(dateStr))) {
    message.error("Please unselect booked days in order to continue");
    return false;
  } else {
    return true;
  }
};
