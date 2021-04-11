import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import "gestalt/dist/gestalt.css";

import { Mask, Box, Text, Heading } from "gestalt";
class Cart extends React.Component {
  state = {
    cartItems: [],
  };

  render() {
    const { cartItems } = this.state;
    return (
      <Box marginTop={2} marginLeft={8}>
        <Mask shape="rounded" wash>
          <Box
            display="flex"
            direction="column"
            alignItems="crnter"
            padding={2}
          >
            <Heading align="center" size="md">
              Your Cart
            </Heading>
            <Text color="midnight" italic align="center">
              {cartItems.length} items selected
            </Text>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Box margin={2}>
                {cartItems.length === 0 && (
                  <Text color="red">Please select some items</Text>
                )}
              </Box>
              <Text size="lg">Total: $3.99</Text>
              <Text>
                <Link to="/checkout">Checkout</Link>
              </Text>
            </Box>
          </Box>
        </Mask>
      </Box>
    );
  }
}

export default Cart;
