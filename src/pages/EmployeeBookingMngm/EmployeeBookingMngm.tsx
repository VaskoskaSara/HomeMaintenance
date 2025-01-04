import {
  Button,
  Calendar,
  Col,
  List,
  message,
  Row,
  Spin,
  Table,
  theme,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { postJsonFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";
import { useAuth } from "../../contexts/AuthContext";
import {
  checkForBooked,
  colors,
  columns,
  getBookings,
  getDisabledDates,
  setBookedDays,
  setDisabledDays,
} from "./EmployeeBookingMng.helper";
import AppWrapper from "src/components/AppWrapper";

const EmployeeBookingMngm: React.FC = () => {
  const { id } = useAuth();
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [availability, setAvailability] = useState<any>({
    booked_dates: [],
    disabled_dates: [],
  });

  const { bookings, isLoading } = getBookings(id as string);
  const { employeeDisabledDates, isLoadingDisabledDates } = getDisabledDates(
    id as string
  );

  useEffect(() => {
    if (!isLoadingDisabledDates && employeeDisabledDates) {
      setDisabledDays(setAvailability, employeeDisabledDates.data);
    }

    if (!isLoading && bookings) {
      setBookedDays(setAvailability, bookings);
    }
  }, [isLoadingDisabledDates, isLoading]);

  const { trigger: triggerAvaliability } = useSWRMutation(
    "/api/booking/employee/manage-avaliability",
    postJsonFetcher
  );

  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleDateSelect = (date: Dayjs) => {
    if (
      !selectedDates.some((selectedDate) => selectedDate.isSame(date, "day"))
    ) {
      setSelectedDates([...selectedDates, date]);
    } else {
      setSelectedDates(
        selectedDates.filter(
          (selectedDate) => !selectedDate.isSame(date, "day")
        )
      );
    }
  };

  const handleEnableDates = async () => {
    const datesToEnable = selectedDates.map((date) =>
      date.format("YYYY-MM-DD")
    );
    await triggerAvaliability({
      userId: id,
      disabledDates: availability.disabled_dates.filter(
        (item: any) => !datesToEnable.includes(item)
      ),
      isEnabled: true,
    });

    setAvailability((prev: any) => ({
      ...prev,
      disabled_dates: availability.disabled_dates.filter(
        (item: any) => !datesToEnable.includes(item)
      ),
    }));
    setSelectedDates([]);
    message.success("Selected dates have been enabled");
  };

  const handleDisableDates = async () => {
    const datesToDisable = selectedDates.map((date) =>
      date.format("YYYY-MM-DD")
    );
    await triggerAvaliability({
      userId: id,
      disabledDates: datesToDisable,
    });
    setAvailability((prev: any) => ({
      ...prev,
      disabled_dates: [...prev.disabled_dates, ...datesToDisable],
    }));
    setSelectedDates([]);
    message.success("Selected dates have been disabled");
  };

  const dateCellRender = (value: Dayjs) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const isBooked = availability.booked_dates.includes(formattedDate);
    const isDisabled = availability.disabled_dates.includes(formattedDate);
    const isSelected = selectedDates.some((selectedDate) =>
      selectedDate.isSame(dayjs(formattedDate), "day")
    );

    let borderColor = "transparent";
    let backgroundColor = "transparent";

    if (isSelected) {
      borderColor = "blue";
      backgroundColor = "rgba(0, 0, 255, 0.2)";
    } else if (isBooked) {
      borderColor = "red";
      backgroundColor = "rgba(255, 0, 0, 0.2)";
    } else if (isDisabled) {
      borderColor = "grey";
      backgroundColor = "rgba(128, 128, 128, 0.2)";
    } else {
      borderColor = "green";
      backgroundColor = "rgba(0, 255, 0, 0.2)";
    }

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: `0.5px solid ${borderColor}`,
            backgroundColor: backgroundColor,
            height: "30px",
            width: "30px",
            borderRadius: "10%",
            margin: "5px",
          }}
        >
          {value.date()} {}
        </div>
      </div>
    );
  };

  return (
    <AppWrapper>
      <div style={{ padding: "20px" }}>
        <Title>Your Bookings</Title>
        {isLoading ? (
          <Spin />
        ) : (
          <Row gutter={50}>
            <Col span={18}>
              <Table
                columns={columns}
                dataSource={bookings?.data}
                pagination={{ pageSize: 10 }}
              />
            </Col>
            <Col span={4}>
              <div style={{ marginBottom: "20px" }}>
                <h3>Legend</h3>
                <List
                  size="small"
                  bordered
                  dataSource={colors}
                  renderItem={(event) => (
                    <List.Item
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: "15px",
                          height: "15px",
                          backgroundColor: event.color,
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      ></div>
                      {event.name}
                    </List.Item>
                  )}
                />
              </div>
              <div style={wrapperStyle}>
                <Calendar
                  fullscreen={false}
                  fullCellRender={(day: Dayjs) => dateCellRender(day)}
                  onSelect={handleDateSelect}
                  mode="month"
                />
                <div className="mt-[10px]">
                  <Button
                    type="primary"
                    onClick={() => {
                      if (
                        checkForBooked(availability.booked_dates, selectedDates)
                      ) {
                        handleDisableDates();
                      }
                    }}
                    disabled={selectedDates.length === 0}
                  >
                    Disable Date(s)
                  </Button>
                  <Button
                    type="default"
                    onClick={() => {
                      if (
                        checkForBooked(availability.booked_dates, selectedDates)
                      ) {
                        handleEnableDates();
                      }
                    }}
                    disabled={selectedDates.length === 0}
                    style={{ marginLeft: "10px" }}
                  >
                    Enable Date(s)
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </AppWrapper>
  );
};

export default EmployeeBookingMngm;
