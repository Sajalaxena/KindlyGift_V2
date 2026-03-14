import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout";
import ThankYouPage from "../components/ThankYouPage";
import { Helmet } from "react-helmet-async";

export default function CheckoutPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  const handleOrderSuccess = (orderIdValue) => {
    setOrderId(orderIdValue);
    setShowThankYou(true);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleCloseCheckout = () => {
    navigate("/");
  };

  if (showThankYou) {
    return (
      <>
        <Helmet>
          <title>Thank You! | KindlyGift</title>
        </Helmet>
        <ThankYouPage orderId={orderId} onGoHome={handleGoHome} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | KindlyGift</title>
        <meta name="description" content="Securely checkout your custom gifts and premium hampers at KindlyGift." />
      </Helmet>
      <Checkout onClose={handleCloseCheckout} onOrderSuccess={handleOrderSuccess} />
    </>
  );
}
