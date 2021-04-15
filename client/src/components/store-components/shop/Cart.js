import { useLazyQuery } from "@apollo/react-hooks";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import "gestalt/dist/gestalt.css";
import { Mask, Box, Text, Heading } from "gestalt";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_CHECKOUT } from "../../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";

const Cart = ({ setCartItems, cartItems }) => {
  const stripePromise = loadStripe(
    "pk_test_51IJ8N2AIilHitPQW5U4lBgGOGRTR0UQja3OwPvN3BiRguzd67qgEjlrpUwS81i6SBZoPdPRiMF5s5o2K7BlPFadN002lkAwAdm"
  );
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let currentTotal = 0;
    cartItems.forEach((element) => {
      currentTotal = currentTotal + element.price;
      setTotal(currentTotal);
      console.log(element);
    });
  }, [cartItems]);
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    getCheckout({
      variables: { amount: total },
    });
  }
  return (
    <Box marginTop={2} marginLeft={8}>
      <Mask alignSelf="end" shape="rounded" wash>
        <Box display="flex" direction="column" alignItems="center" padding={2}>
          <h2>Your Cart</h2>
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
            <Text size="lg">Total: ${total}</Text>
            <Text>
              <Link onClick={submitCheckout}>Checkout</Link>
            </Text>
          </Box>
        </Box>
      </Mask>
    </Box>
  );
};

export default Cart;
