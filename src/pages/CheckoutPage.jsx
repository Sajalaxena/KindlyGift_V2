import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout";
import ThankYouPage from "../components/ThankYouPage";

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
    return <ThankYouPage orderId={orderId} onGoHome={handleGoHome} />;
  }

  return <Checkout onClose={handleCloseCheckout} onOrderSuccess={handleOrderSuccess} />;
}
