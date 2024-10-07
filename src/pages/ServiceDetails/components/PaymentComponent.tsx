import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button, Form, Result } from "antd";
import Title from "antd/es/typography/Title";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJsonFetcher } from "src/api/apiCommand";
import useSWRMutation from "swr/mutation";

interface PaymentComponentProps {
  calculatedPrice: number;
  setIsPaymentFormVisible: Dispatch<SetStateAction<boolean>>;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({
  calculatedPrice,
  setIsPaymentFormVisible,
}: PaymentComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const { trigger } = useSWRMutation(
    "/api/payment/create-intent",
    postJsonFetcher
  );

  const handlePayment = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);

      if (!stripe || !elements) {
        console.error("Stripe.js hasn't loaded yet.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement is not mounted.");
        setLoading(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error creating payment method:", error);
        setPaymentSuccess(false);
      }

      try {
        var paymentData = {
          paymentMethodId: paymentMethod?.id,
          amount: calculatedPrice,
        };

        trigger(paymentData).then(async (res: any) => {
          const secret = res.clientSecret;
          const confirmResult = await stripe.confirmCardPayment(secret);
          if (confirmResult.error) {
            setPaymentSuccess(false);
          } else {
            setPaymentSuccess(true);
          }
        });
      } catch (error) {
        setPaymentSuccess(false);
      } finally {
        setLoading(false);
      }
    } catch (ex) {
      setPaymentSuccess(false);
    }
  };

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
