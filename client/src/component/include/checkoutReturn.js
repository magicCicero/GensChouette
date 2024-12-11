import { React, useEffect } from "react";
import {Box, Button, IconButton, Typography,} from "@mui/material";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import Cookies from 'js-cookie'

function CheckoutReturn(props) {
  const [message, setMessage] = useState("読み込み中...");
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const statusMessageMap = {
    "Completed": "ご注文が完了しました",
    "BuyerCanceled": "The Order has been canceled by the user",
    "Expired": "The Checkout Session expired 24 hour after creation because there was no redirect to the amazonPayRedirectUrl, buyer did not complete payment, or the checkout was not confirmed with Complete Checkout Session",
    "AmazonCanceled": "Amazon has canceled the transaction due to service unavailability. This is not a payment associated cancelation",
    "Declined": "Generic payment decline reason code that includes fraud declines, failure to complete multi-factor authentication (MFA) challenge, and issues with the payment instrument"
  }

  const search = window.location?.search;
  const params = new URLSearchParams(search);
  const checkoutSessionId = params.get('amazonCheckoutSessionId');
  const BASE_URL = "http://localhost:3001";
  const product = localStorage.getItem("selectedProduct");
  const orderInfo = localStorage.getItem("orderInfo");
  console.log("orderInfo  >>>>>>>>>>>>>>>>>>  ", orderInfo)
  // const product = JSON.parse(productString); // Parse the string into an object
  // const orderInfo = JSON.parse(orderInfoString);

  console.log("product >>>>>>> ", product);
  const userID = Cookies.get('userID');

  // const completePayment = async () => {
  //   // create order id
  //   const orderReferenceId = uuidv4();
  //   const payload = {
  //     orderReferenceId: orderReferenceId,
  //     amount: product['price'],
  //     productID: product['id'],
  //     userID: userID
  //   };
  
  //   try {
  //     const response = await fetch(BASE_URL + "/payment-completion", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(payload)
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Request failed with status ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     console.log("Payment completion response:", data);
  //   } catch (error) {
  //     console.error("Error completing payment:", error);
  //   }
  // };
  
  const callGetCheckout = (chargeId) => {
        fetch(BASE_URL + "/getCharge?" + new URLSearchParams({ chargeId }))
        .then(res => res.json())
        .then((res) => {
          console.log("30 seconds")
          if(res.statusDetails.state==="Authorized")
          {
            // completePayment();
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
        })
        
  }
  useEffect(() => {
    const productID = product["id"];
    const merchantReferenceId = orderInfo["merchantReferenceId"]
    console.log("productID >>>>>>>>>>> ", productID);
    fetch(BASE_URL + "/completeCheckoutSession?" + new URLSearchParams({ checkoutSessionId, userID, productID, merchantReferenceId}))
      .then(res => {
        console.log(res);
        // Extract relevant data from the response
        const chargeInfo = {
          chargeId : res.chargeId,
          chargePermissionId : res.chargePermissionId,
        }
        localStorage.setItem("chargeInfo", chargeInfo);
      })
      .then(() => {

        fetch(BASE_URL + "/getCheckoutSession?" + new URLSearchParams({ checkoutSessionId }))
        .then(res => res.json())
        .then((res) => {
          if(res.statusDetails.state === "Completed") {
            setMessage("ご注文...");
            setTimeout(() => callGetCheckout(res.chargeId), 5000)
          }
          else{
            setMessage(res.statusDetails.state+":"+res.statusDetails.reasonCode+":"+res.statusDetails.reasonDescription);
            setText("Please try again with a new Payment method");
          
            setIsLoading(false);
          }
        });
      })

  }, []);

  const goBackToReview = () => {
    window.location.href = "http://localhost:3000"
  }

  return (
      <Box sx={{textAlign: "center", padding: "3rem", height: 'auto', flexGrow: '1'}}>
        <Typography variant="h4">{message}</Typography>
        {isLoading ? <Spinner animation="border" variant="primary"/> : ""}
        {text ? 
          <div> 
            {text} <br />
            <Button variant="outlined" onClick={goBackToReview}>Try Again</Button>
          </div>
          :""}
      </Box>
  );
}

export default CheckoutReturn;