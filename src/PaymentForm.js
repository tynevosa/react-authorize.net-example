import React from "react";
import { useAcceptJs } from "react-acceptjs";

const authData = {
  apiLoginID: "YOUR AUTHORIZE.NET API LOGIN ID",
  clientKey: "YOUR AUTHORIZE.NET PUBLIC CLIENT KEY",
};

const PaymentForm = () => {
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = React.useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cardCode: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
    const response = await dispatchData({ cardData });
    console.log("Received response:", response);
  };

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={(event) =>
            setCardData({ ...cardData, cardNumber: event.target.value })
          }
        />
        <input
          type="text"
          name="expMonth"
          value={cardData.expMonth}
          onChange={(event) =>
            setCardData({ ...cardData, expMonth: event.target.value })
          }
        />
        <input
          type="text"
          name="expYear"
          value={cardData.expYear}
          onChange={(event) =>
            setCardData({ ...cardData, expYear: event.target.value })
          }
        />
        <input
          type="text"
          name="cardCode"
          value={cardData.cardCode}
          onChange={(event) =>
            setCardData({ ...cardData, cardCode: event.target.value })
          }
        />
        <button type="submit" disabled={loading || error}>
          Pay
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
