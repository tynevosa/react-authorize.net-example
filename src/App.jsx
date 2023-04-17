import React, { Component } from "react";
import { Flex, Box, Text, Heading } from "rebass";
import styled from "styled-components";
import { FormComponent, FormContainer } from "react-authorize-net";
import { Client, Check } from "authorizenet";

let clientKey = "SIMON";
let apiLoginId = "645VpWBk6C";

const Button = styled.button({
  "&:hover": { cursor: "pointer" },
  padding: "10px",
  backgroundColor: "white",
  border: "2px solid black",
  fontWeight: 600,
  borderRadius: "2px",
});

const ErrorComponent = (props) => (
  <div>
    <Text fontSize={3} fontWeight={"500"} mb={3}>
      Failed to process payment
    </Text>
    {props.errors.map((error) => (
      <Text py={2}>{error}</Text>
    ))}
    <Button onClick={props.onBackButtonClick}>Go Back</Button>
  </div>
);

const Header = (props) => (
  <Flex py={4}>
    <Heading>react-authorize-net-example</Heading>
  </Flex>
);

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize Authorize.net client
    this.client = new Client({
      apiLoginId: "645VpWBk6C",
      transactionKey: "3p27t37jSM8VV5q7",
      environment: "sandbox", // or 'production'
    });

    // Set initial state
    this.state = {
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const card = {
      cardNumber: this.state.cardNumber,
      expirationDate: this.state.expirationDate,
      cvv: this.state.cvv,
    };

    const check = new Check({
      amount: 10.0,
      firstName: "John",
      lastName: "Doe",
      accountType: "checking",
      routingNumber: "125000024",
      accountNumber: "12345678",
    });

    this.client.createTransaction(
      {
        amount: 10.0,
        payment: { creditCard: card },
        check: check,
      },
      (response) => {
        console.log(response);
        // Display success or error message to the user based on response
      }
    );
  };
  // state = { status: "unpaid" };

  // onErrorHandler = (response) => {
  //   this.setState({
  //     status: ["failure", response.messages.message.map((err) => err.text)],
  //   });
  // };

  // onSuccessHandler = (response) => {
  //   // Process API response on your backend...
  //   this.setState({ status: ["failure", []] });
  // };

  render() {
    return (
      // <Box className="App" p={3}>
      //   <Header />
      //   {this.state.status === "paid" ? (
      //     <Text fontWeight={"500"} fontSize={3} mb={4}>
      //       Thank you for your payment!
      //     </Text>
      //   ) : this.state.status === "unpaid" ? (
      //     <FormContainer
      //       environment="sandbox"
      //       onError={this.onErrorHandler}
      //       onSuccess={this.onSuccessHandler}
      //       amount={23}
      //       component={FormComponent}
      //       apiLoginId={apiLoginId}
      //     />
      //   ) : this.state.status[0] === "failure" ? (
      //     <ErrorComponent
      //       onBackButtonClick={() => this.setState({ status: "unpaid" })}
      //       errors={this.state.status[1]}
      //     />
      //   ) : null}
      // </Box>
      <form id="payment-form" onSubmit={this.handleSubmit}>
        <label>
          Card Number
          <input
            type="text"
            name="cardNumber"
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          Expiration Date
          <input
            type="text"
            name="expirationDate"
            onChange={this.handleInputChange}
          />
        </label>
        <label>
          CVV
          <input type="text" name="cvv" onChange={this.handleInputChange} />
        </label>
        <button type="submit">Pay</button>
      </form>
    );
  }
}

export default App;
