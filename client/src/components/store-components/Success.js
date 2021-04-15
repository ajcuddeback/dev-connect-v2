import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import "gestalt/dist/gestalt.css";

import { Box, Image, Text, Heading, ButtonGroup } from "gestalt";
import pic from "../../images/red-on-trans-logo.webp";

function Success() {
  return (
    <Box display="flex" direction="row" justifyContent="around">
      <Box
        color="transparent"
        height={1000}
        width={1000}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="wide"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src={pic}
        />
        <Box
          alignItems="center"
          display="flex"
          direction="column"
          justifyContent="around"
        >
          <Heading color="midnight">Your purchase was successful!</Heading>
          <Heading color="midnight" text="lg">
            Thank you!
          </Heading>
          <Link to={`/shop`}>
            <Text color="watermelon">Continue Shopping</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
export default Success;
