/* global amazon */

import React, { useEffect, useState } from 'react';
import { fetchData } from '../../util/api';

const AmazonPayButton = ({ amount, handleAmazonPayClick }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSellerId = async () => {
      try {
        const data = await fetchData('/config/seller-id', 'GET');
        if (data) {
          return data.sellerId;
        } else {
          throw new Error(data.error || 'Failed to fetch Seller ID');
        }
      } catch (error) {
        console.error("Error fetching Seller ID:", error);
        setError('Failed to load Amazon Pay configuration.');
        return null;
      }
    };
    
    const fetchCheckoutSessionConfig = async () => {
      try {
          const sessionConfig = await fetchData('/amazon-checkout-session', 'POST', { amount });
          if (sessionConfig) {
              return sessionConfig;
          } else {
            throw new Error(sessionConfig.error || 'Failed to prepare Amazon Pay session.');
          }
      } catch (error) {
          console.error("Error fetching checkout session config:", error);
          setError('Amazon Pay session could not be initialized.');
          return null;
      }
    };
    
    useEffect(() => {
      if (window.amazon) {
        const initAmazonPayButton = async () => {
          
          const fetchedSellerId = await fetchSellerId();
          if (!fetchedSellerId) return;
          
          const sessionConfig = await fetchCheckoutSessionConfig();
          if (!sessionConfig) return;
          
          const amazonPayButton = amazon.Pay.renderButton('#amazonPayButton', { // render + signin
            merchantId: fetchedSellerId,
            sandbox: true, // Set to false in production
            checkoutLanguage: 'ja_JP',
            ledgerCurrency: 'JPY',
            placement: 'Checkout',
            // onPaymentAuthorize: (data) => {
            //   handlePayment(data.amazonOrderReferenceId);
            // },
            onError: (err) => {
              console.error('Amazon Pay button error:', err);
              setError('Amazon Pay button failed to load.');
            },
          });

          amazonPayButton.onClick(()=>{
            handleAmazonPayClick();
            amazonPayButton.initCheckout({
              createCheckoutSessionConfig: sessionConfig
            });
          });
        };
        
        initAmazonPayButton();
      } else {
        console.error('Amazon Pay SDK not loaded');
        setError('Amazon Pay SDK is unavailable. Please try again later.');
      }
    }, []);
    
    // const handlePayment = async (orderReferenceId) => {
    //     console.log("Amazon Pay button clicked");
    //     setLoading(true);
    //     setError(null);

    //     const orderData = {
    //         orderReferenceId: orderReferenceId,
    //         amount: amount,
    //         productID: productID
    //     };

    //     try {
    //         const response = await fetch('/process-payment', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(orderData),
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log('Payment processed successfully:', data);
    //             // Handle successful payment (e.g., redirect to confirmation page)
    //         } else {
    //             console.error('Payment processing failed:', data);
    //             setError(data.error || 'Payment processing failed');
    //         }
    //     } catch (error) {
    //         console.error('Error during payment:', error);
    //         setError('An error occurred during payment processing');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div>
            <div id="amazonPayButton"></div>
            {loading && <p>Processing payment...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AmazonPayButton;