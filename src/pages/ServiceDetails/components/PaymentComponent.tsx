import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Form, Result } from "antd";
import Title from "antd/es/typography/Title";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postJsonFetcher } from "src/api/apiCommand";
import { TransactionDetails } from "src/pages/Services/Services.types";
import useSWRMutation from "swr/mutation";
import moment from "moment";
import { useNotifications } from "src/contexts/NotificationContext";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

interface PaymentComponentProps {
  calculatedPrice: number;
  setIsPaymentFormVisible: Dispatch<SetStateAction<boolean>>;
  selectedDates: string[];
  selectedTimes: any[];
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  calculatedPrice,
  setIsPaymentFormVisible,
  selectedDates,
  selectedTimes,
}: PaymentComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { authId } = useSelector((state: RootState) => ({
    authId: state.auth.id
  }));
  const { addNotification } = useNotifications();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    calculatedPrice === 0 && handlePayment();
  }, []);

  const { trigger } = useSWRMutation(
    "/api/payment/create-intent",
    postJsonFetcher
  );

  const { trigger: transactionTrigger } = useSWRMutation(
    "/api/payment/save-transaction",
    postJsonFetcher
  );

  const handlePayment = async (event?: React.FormEvent) => {
    setLoading(true);

    try {
      if (event) {
        event.preventDefault();

        if (!stripe || !elements) {
          console.error("Stripe.js hasn't loaded yet.");
          return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          console.error("CardElement is not mounted.");
          return;
        }

        const { error: paymentMethodError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });

        if (paymentMethodError) {
          console.error("Error creating payment method:", paymentMethodError);
          setPaymentSuccess(false);
          return;
        }

        const paymentData = {
          paymentMethodId: paymentMethod.id,
          amount: calculatedPrice,
        };

        const { clientSecret } = (await trigger(paymentData)) as { clientSecret: string };

        const confirmResult = await stripe.confirmCardPayment(clientSecret);
        if (confirmResult.error) {
          setPaymentSuccess(false);
        } else {
          setPaymentSuccess(true);
        }
      } else {
        setPaymentSuccess(true);
      }
    } catch (error) {
      console.error("An error occurred during payment processing:", error);
      setPaymentSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentSuccess === null || paymentSuccess === false) return;

    const [startHour, startMinute] = selectedTimes[0].split(":").map(Number);
    const [endHour, endMinute] = selectedTimes[1].split(":").map(Number);

    const transactionData = {
      userId: authId,
      employeeId: id,
      amount: calculatedPrice,
      paymentId: undefined,
      startDateTime: moment.utc(selectedDates[0]).set({
        hour: startHour,
        minute: startMinute,
      }),
      endDateTime: moment.utc(selectedDates[1]).set({
        hour: endHour,
        minute: endMinute,
      }),
    } as unknown as TransactionDetails;

    try {
      transactionTrigger(transactionData);
      addNotification(
        id as string,
        "New booking for you! Check your bookings."
      );
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  }, [paymentSuccess]);

  useEffect(() => {
    if (calculatedPrice === 0) {
      handlePayment();
    }
  }, [calculatedPrice]);

  return (
    <>
      {paymentSuccess === null ? (
        <>
          <Title level={4}>Enter Payment Details</Title>
          <Form.Item label="Card Details" required>
            <CardElement />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            onClick={handlePayment}
            loading={loading}
          >
            Pay {calculatedPrice ?? "0"}$
          </Button>
        </>
      ) : paymentSuccess ? (
        <Result
          status="success"
          title="Payment Successful"
          subTitle={`Your payment of $${calculatedPrice} has been processed successfully.`}
          extra={[
            <Button
              type="primary"
              key="home"
              onClick={() => navigate("/services")}
            >
              Go to Services
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Payment Failed"
          subTitle="There was an issue with your payment. Please try again."
          extra={[
            <Button type="primary" key="retry" onClick={handlePayment}>
              Retry Payment
            </Button>,
            <Button
              key="cancel"
              onClick={() => {
                setPaymentSuccess(null);
                setIsPaymentFormVisible(false);
              }}
            >
              Cancel
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default PaymentComponent;
