import React, { useEffect, useState } from "react";

const PaymentForm = () => {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    month: "",
    year: "",
    cvv: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCardData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handlePayment(event) {
    event.preventDefault();
    const authData = {
      clientKey: "SIMON",
      apiLoginID: "645VpWBk6C",
      data: {
        type: "card",
        card: cardData,
      },
    };

    window.Accept.dispatchData(authData, function(response) {
      if (response.messages.resultCode === "Error") {
        // Handle error
        console.error(response.messages.message);
      } else {
        const token = response.opaqueData.dataValue;
        const paymentData = {
          authData: {
            apiKey: "YOUR_API_KEY",
            apiLoginID: "YOUR_API_LOGIN_ID",
          },
          transactionData: {
            amount: "10.00",
            currency: "USD",
            payment: {
              opaqueData: {
                dataDescriptor: "COMMON.ACCEPT.INAPP.PAYMENT",
                dataValue: token,
              },
            },
          },
        };

        fetch("https://api.authorize.net/payment/transactions", {
          method: "POST",
          body: JSON.stringify(paymentData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.transactionResponse.responseCode === "1") {
              // Payment successful
              console.log("Payment successful!");
            } else {
              // Payment failed
              console.error(data.transactionResponse.errors.error[0].errorText);
            }
          })
          .catch((error) => {
            // Handle error
            console.error(error);
          });
      }
    });
  }
  return (
    <>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="month">Expiration Month:</label>
          <input
            type="text"
            id="month"
            name="month"
            value={cardData.month}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="year">Expiration Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={cardData.year}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardData.cvv}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </>
  );
};

export default PaymentForm;
