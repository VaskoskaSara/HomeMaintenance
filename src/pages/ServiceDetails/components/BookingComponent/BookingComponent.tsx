/* eslint-disable react-hooks/rules-of-hooks */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button, DatePicker, Divider, Form, Modal, TimePicker } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFetcher } from "src/api/apiQuery";
import { getDisabledDates } from "src/pages/EmployeeBookingMngm/EmployeeBookingMng.helper";
import { ApiResponse } from "src/pages/RegisterPage/RegisterPage.props";
import { EmployeeBooking } from "src/pages/Services/Services.types";
import useSWR from "swr";
import PaymentComponent from "../PaymentComponent";
import {
  calculatePrice,
  IsDisabledDate,
  IsDisabledTime,
} from "./BookingComponent.helper";

const stripePromise = loadStripe(
  "pk_test_51Q6cIcGArExm7bjZduNIVDi8TKgBOtAtKJr97f07B9UlcpA9gr5y0uu0AOpjfWAteQXqZcrv8vGWRZTUFCGgbnJC00WvPYbltN"
);

const { RangePicker } = DatePicker;

const BookingComponent: React.FC<EmployeeBooking> = ({
  paymentType,
  price,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaymentFormVisible, setIsPaymentFormVisible] = useState(false); // For payment form
  const [form] = Form.useForm();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<any[]>([]);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const { id } = useParams();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedDates([]);
    setSelectedTimes([]);
    setCalculatedPrice(0);
    setIsPaymentFormVisible(false);
  };

  const handleDateChange = (dates: any) => {
    const updatedDates = dates ? dates.map((date: any) => date.format("YYYY-MM-DD")) : [];
    setSelectedDates(updatedDates);
  };

  const handleTimeChange = (times: any) => {
    const formattedTimes = times ? times.map((time: any) => time.format("HH:mm")) : [];
    setSelectedTimes(formattedTimes);
  };

  const { employeeDisabledDates, isLoadingDisabledDates } = getDisabledDates(
    id as string
  );

  const { data: bookedDays, isLoading: isLoadingBookingDays } = useSWR<
    ApiResponse<Date[]>
  >(`/api/booking/employee/${id}/booked-dates`, getFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (
      !isLoadingDisabledDates &&
      !isLoadingBookingDays &&
      employeeDisabledDates &&
      bookedDays
    ) {
      setDisabledDates([...employeeDisabledDates?.data, ...bookedDays.data]);
    }
  }, [isLoadingDisabledDates, isLoadingBookingDays]);

  const handleSubmit = () => {
    setIsPaymentFormVisible(true);
  };

  useEffect(() => {
    if (selectedDates.length > 0 && selectedTimes.length > 0)
      calculatePrice(
        selectedDates,
        selectedTimes,
        paymentType,
        price,
        setCalculatedPrice
      );
  }, [selectedTimes, selectedDates]);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="mr-2">📅</span>
        Book Me
      </Button>

      <Modal
        title="Book Your Appointment"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {!isPaymentFormVisible && (
            <>
              <Form.Item
                label="Select Dates"
                name="dates"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one date!",
                  },
                ]}
              >
                <RangePicker
                  format="YYYY-MM-DD"
                  disabledDate={(current) =>
                    IsDisabledDate(current, disabledDates)
                  }
                  onChange={handleDateChange}
                  style={{ width: "100%" }}
                  allowClear
                />
              </Form.Item>
              <div className="mb-4">
                <strong>Selected date range:</strong>
                <ul>
                  {selectedDates.length > 0 ? (
                    selectedDates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))
                  ) : (
                    <li>No dates selected</li>
                  )}
                </ul>
              </div>
              <Form.Item
                label="Select Times"
                name="times"
                rules={[
                  { required: true, message: "Please select a time range!" },
                  {
                    validator: (_, value) => {
                      if (value && value.length === 2) {
                        const duration = value[1].diff(value[0], "hours");
                        if (duration > 8) {
                          return Promise.reject(
                            new Error(
                              "The selected time range cannot exceed 8 hours."
                            )
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <TimePicker.RangePicker
                  format="HH:mm"
                  disabledTime={IsDisabledTime}
                  style={{ width: "100%" }}
                  minuteStep={30}
                  showNow={false}
                  onChange={handleTimeChange}
                  allowClear
                />
              </Form.Item>

              <div className="mb-4">
                <strong>Selected Times:</strong>
                <ul>
                  {selectedTimes.length > 0 ? (
                    selectedTimes.map((time, index) => (
                      <li key={index}>{time}</li>
                    ))
                  ) : (
                    <li>No times selected</li>
                  )}
                </ul>
              </div>
              <Divider />
              <Title>Price: {calculatedPrice}$</Title>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Confirm Booking
                </Button>
              </Form.Item>
            </>
          )}
          {isPaymentFormVisible && (
            <Elements stripe={stripePromise}>
              <PaymentComponent
                calculatedPrice={calculatedPrice}
                setIsPaymentFormVisible={setIsPaymentFormVisible}
                selectedDates={selectedDates}
                selectedTimes={selectedTimes}
              />
            </Elements>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default BookingComponent;
