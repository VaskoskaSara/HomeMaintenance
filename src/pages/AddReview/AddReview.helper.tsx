import { useState } from "react";
import { getBookingsByUser } from "../ViewBookings/ViewBookings.helper";
const useReviewModalHook = (id: string) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { bookings, isLoading } = getBookingsByUser(id);


  const handleClose = async () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return {
    isModalVisible,
    handleClose,
    setIsModalVisible,
    showModal,
    bookings,
    isLoading
  };
};

export default useReviewModalHook;
