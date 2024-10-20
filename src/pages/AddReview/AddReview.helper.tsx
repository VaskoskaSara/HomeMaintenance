import { useState } from "react";

const useReviewModalHook = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return {
    isModalVisible,
    handleClose,
    setIsModalVisible,
    showModal
  };
};

export default useReviewModalHook;
