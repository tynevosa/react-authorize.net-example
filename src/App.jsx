import React, { Component } from "react";
import { Flex, Box, Text, Heading } from "rebass";
import styled from "styled-components";
import { FormComponent, FormContainer } from "react-authorize-net";
import PaymentForm from "./PaymentForm";

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
  state = { status: "unpaid" };

  onErrorHandler = (response) => {
    this.setState({
      status: ["failure", response.messages.message.map((err) => err.text)],
    });
  };

  onSuccessHandler = (response) => {
    // Process API response on your backend...
    this.setState({ status: ["failure", []] });
  };

  render() {
    return (
      <PaymentForm />
      // <Box className="App" p={3}>
      //   <Header />
      //   {this.state.status === "paid" ? (
      //     <Text fontWeight={"500"} fontSize={3} mb={4}>
      //       Thank you for your payment!
      //     </Text>
      //   ) : this.state.status === "unpaid" ? (
      //     <FormContainer
      //       environment="production"
      //       onError={this.onErrorHandler}
      //       onSuccess={this.onSuccessHandler}
      //       amount={23}
      //       component={FormComponent}
      //       clientKey={clientKey}
      //       apiLoginId={apiLoginId}
      //     />
      //   ) : this.state.status[0] === "failure" ? (
      //     <ErrorComponent
      //       onBackButtonClick={() => this.setState({ status: "unpaid" })}
      //       errors={this.state.status[1]}
      //     />
      //   ) : null}
      // </Box>
    );
  }
}

export default App;
