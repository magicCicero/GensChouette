import { React, useEffect } from "react";

import { useState } from "react";
import { Card, Spinner, Button } from "react-bootstrap";


function CheckoutReturn(props) {
  const [message, setMessage] = useState("loading...");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const statusMessageMap = {
    "Completed": "Your Order has been placed",
    "BuyerCanceled": "The Order has been canceled by the user",
    "Expired": "The Checkout Session expired 24 hour after creation because there was no redirect to the amazonPayRedirectUrl, buyer did not complete payment, or the checkout was not confirmed with Complete Checkout Session",
    "AmazonCanceled": "Amazon has canceled the transaction due to service unavailability. This is not a payment associated cancelation",
    "Declined": "Generic payment decline reason code that includes fraud declines, failure to complete multi-factor authentication (MFA) challenge, and issues with the payment instrument"
  }

  const search = window.location?.search;
  const params = new URLSearchParams(search);
  const checkoutSessionId = params.get('amazonCheckoutSessionId');
  const BASE_URL = "http://localhost:3001";

  const callGetCheckout = (chargeId) => {
        fetch(BASE_URL + "/getCharge?" + new URLSearchParams({ chargeId }))
        .then(res => res.json())
        .then((res) => {
          console.log("30 seconds")
          if(res.statusDetails.state==="Authorized")
          {
            setMessage(statusMessageMap["Completed"]);
            setIsLoading(false);
          }
          else if(res.statusDetails.state==="AuthorizationInitiated")
          {
            setMessage(res.statusDetails.state);
            setTimeout(() => callGetCheckout(chargeId), 35000);
          }
          else
          {
            setMessage(res.statusDetails.state+":"+res.statusDetails.reasonCode);
            setText("Please try again with a different payment method");
            setIsLoading(false);
          }
          setApiResponse(JSON.stringify(res, null, 3));

        })
        
  }
  useEffect(() => {
    fetch(BASE_URL + "/completeCheckoutSession?" + new URLSearchParams({ checkoutSessionId }))
      .then((res) => res.json())
      .then((res) => {

        fetch(BASE_URL + "/getCheckoutSession?" + new URLSearchParams({ checkoutSessionId }))
        .then(res => res.json())
        .then((res) => {
          if(res.statusDetails.state === "Completed") {
            setMessage("Placing your order...");
            setTimeout(() => callGetCheckout(res.chargeId), 5000)
          }
          else{
            setMessage(res.statusDetails.state+":"+res.statusDetails.reasonCode+":"+res.statusDetails.reasonDescription);
            setText("Please try again with a new Payment method");
          
            setIsLoading(false);

          }
        });
          setApiResponse(JSON.stringify(res, null, 3));
      })

  }, []);

  const goBackToReview = () => {
    window.location.href = "http://localhost:3000"
  }

  return (
    <div className="App">
      <body className="App-body">
        {/* ---------------------------  product info ----------------------- */}
        {/* <Item /> */}
        <div style={{ padding: "3em" }}>
          <Card>
            <Card.Body>
              <Card.Title style={{ color: 'purple' }}>{message}</Card.Title>
              <Card.Text>
                {isLoading ? <Spinner animation="border" />:""}
                {text?<div>{text}<br /><Button style={{ backgroundColor:"purple", align:"center" }} onClick={goBackToReview}>Try Again</Button></div>:""}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </body>
    </div>
  );
}

export default CheckoutReturn;