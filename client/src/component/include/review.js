import { React, useEffect } from 'react';
import {Box, Button, Container, Grid, Typography,} from "@mui/material";
import { useState } from 'react';
import { styles } from '../styles/reviewStyle';
import { displayText, filterItems } from '../../util/filterItems';
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
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);
  };

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
            <div className="App">
              <body className="App-body">
                <div style={{ padding: '3em' }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Shipping Address</Card.Title>
                      <Card.Text>
                        {isLoading ? (
                          <div>
                            <p>loading...</p>
                          </div>
                        ) : (
                          <div>
                            {address
                              ? Object.keys(address).map((key) => {
                                  return <div>{address[key]}</div>;
                                })
                              : 'No address available'}
                          </div>
                        )}
                      </Card.Text>
                      <div id="changeButton1">
                        <Button variant="secondary">Change Address</Button>
                      </div>
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Body>
                      <Card.Title>Payment Method</Card.Title>
                      <Card.Text>
                        {isLoading ? (
                          <div>
                            <p>loading...</p>
                          </div>
                        ) : (
                          <div>
                            {JSON.stringify(paymentMethod)}
                            <br />
                          </div>
                        )}
                      </Card.Text>
                      <div id="changeButton2">
                        <Button variant="secondary">Change Payment Method</Button>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Button
                        style={{ backgroundColor: 'purple', align: 'center' }}
                        onClick={updateCheckout}
                      >
                        Confirm Checkout
                      </Button>
                    </Card.Body>
                  </Card>
                  <div style={{ justifyContent: 'center', padding: '1em' }}></div>
                </div>
              </body>
            </div>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Review;
