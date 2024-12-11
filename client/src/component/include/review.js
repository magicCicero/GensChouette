import { React, useEffect } from 'react';
import {Box, Button, CardActions, CardContent, CardHeader, Container, Grid, Paper, Typography,} from "@mui/material";
import { useState } from 'react';
import { styles } from '../styles/reviewStyle';
import { Card } from "react-bootstrap";
import ReviewTable from '../../util/reviewTable';

function Review(props) {
  const [isLoading, setIsLoading] = useState(true);
  const search = window.location?.search;
  const params = new URLSearchParams(search);
  const checkoutSessionId = params.get('amazonCheckoutSessionId');
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [product, setProduct] = useState(null);
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    // Fetch product from localStorage
    const storedProduct = localStorage.getItem("selectedProduct");
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
      console.log("Product loaded from localStorage:", JSON.parse(storedProduct));
    }
    
    fetch(BASE_URL + 
      '/getCheckoutSession?' + new URLSearchParams({ checkoutSessionId }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
          changeAddressButton(checkoutSessionId);
          changePaymentButton(checkoutSessionId);
          setIsLoading(false);
          setAddress(res.shippingAddress);
          setPaymentMethod(res.paymentPreferences[0].paymentDescriptor);
          console.log('getCheckoutSession complete');
      });
  }, []);

  const updateCheckout = () => {
    console.log('button pressed');
    fetch(BASE_URL + 
      '/updateCheckoutSession?' + new URLSearchParams({ checkoutSessionId }),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const orderInfo = {
          merchantReferenceId : res.merchantMetadata.merchantReferenceId,
          chargeAmount : res.paymentDetails.chargeAmount.amount,
          billingAddress : res.billingAddress,
          paymentMethod : res.paymentMethod,
          shippingAddress : res.shippingAddress
        }
        console.log("orderInfo   >>>>>>>>>>>>>>>>>>>>>    ", orderInfo);

        localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

        window.location.href = res.webCheckoutDetails.amazonPayRedirectUrl;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeAddressButton = (CheckoutSessionId) => {
    console.log('ChxId', CheckoutSessionId);
    window.amazon.Pay.bindChangeAction('#changeButton1', {
      amazonCheckoutSessionId: CheckoutSessionId,
      changeAction: 'changeAddress',
    });
  };

  const changePaymentButton = (CheckoutSessionId) => {
    console.log('ChxId', CheckoutSessionId);
    window.amazon.Pay.bindChangeAction('#changeButton2', {
      amazonCheckoutSessionId: CheckoutSessionId,
      changeAction: 'changePayment',
    });
  };

  return (
    <Container sx={{ ...styles.container }}>
      {product && (
        <Grid container spacing={2} sx={{ ...styles.grid }}>
          <Grid item xs={12} sm={6} md={6} sx={{ ...styles.gridItem1 }}>
            <ReviewTable product={product} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} sx={{ ...styles.gridItem2 }}>
            <Paper elevation={3} sx={{...styles.paper}}>
              <Card>
                <Box sx={{...styles.flex}}>
                  <CardHeader title="Shipping Address"/>
                  <CardActions>
                      <Button variant="text" id="changeButton1" size='small'>Change</Button>
                    </CardActions>
                </Box>
                  <CardContent>
                    {isLoading ? (
                      <Typography> loading... </Typography>
                    ) : (
                      address ? (
                        Object.keys(address).map((key) => (
                          <Typography key={key}>{address[key]}</Typography>
                        ))
                        ) : (
                        <Typography>No address available</Typography>
                        )
                    )}
                  </CardContent>
              </Card>
              <Card>
                <Box sx={{...styles.flex}}>
                <CardHeader title="Payment Method"/>
                <CardActions>
                    <Button variant="text" id="changeButton2" size='small'>Change</Button>
                  </CardActions>
                </Box>
                <CardContent>
                    {isLoading ? (
                      <Typography> loading... </Typography>
                    ) : (
                      <Typography>
                        {JSON.stringify(paymentMethod)}
                      </Typography>
                    )}
                </CardContent>
              </Card>
              <Button
                variant="contained"
                color="info"
                onClick={updateCheckout}
                sx={{float:"right", marginTop:"10px"}}
              >
                Confirm Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Review;
