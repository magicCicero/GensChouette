import { React, useEffect } from 'react';

import { useState } from 'react';
// import Item from './Item';
import { Card, Button } from 'react-bootstrap';
import APICard from './APICard';

function Review(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [apiResponse, setApiResponse] = useState('');
  const search = window.location?.search;
  const params = new URLSearchParams(search);
  const checkoutSessionId = params.get('amazonCheckoutSessionId');
  const [address, setAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    console.log(localStorage.getItem("selectedProduct"), "localstorage");
    
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
            setApiResponse(JSON.stringify(res, null, 3));
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
    <div className="App">
      <body className="App-body">
        {/* ---------------------------  product info ----------------------- */}
        {/* <Item /> */}

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
          {/* <p>{JSON.stringify(address)}</p> */}

          {/* <p>{isLoading?"loading...":JSON.stringify(paymentMethod)}</p>
          <div id="changeButton2">Change Payment Method</div> */}
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
        <APICard text={apiResponse} />
      </body>
    </div>
  );
}

export default Review;
