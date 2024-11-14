/* global amazon */

import React, { useEffect } from 'react';

const AmazonPayButton = ({amount}) => {
    useEffect(() => {
        // Check if the amazon object is available
        if (window.amazon) {
            console.log("Amazon Pay SDK loaded");
            window.onAmazonLoginReady = function () {
                amazon.Login.setClientId('YOUR_CLIENT_ID'); // Your Amazon Pay Client ID
            };

            // Render the Amazon Pay button
            try {
              console.log("Attempting to render Amazon Pay button");
                amazon.Pay.renderButton('amazonPayButton', {
                    type: 'PwA', // Pay with Amazon
                    color: 'Gold', // Button color
                    size: 'medium', // Button size
                    // Add other options as needed
                    onPaymentAuthorize: handlePayment, // Call handlePayment on successful authorization
                });
            } catch (error) {
                console.error("Error rendering Amazon Pay button:", error);
            }
        } else {
            console.error('Amazon Pay SDK not loaded');
        }
    }, []);

    const handlePayment = async (orderReferenceId) => {
        const orderData = {
            orderReferenceId: orderReferenceId, // Use the actual order reference ID from Amazon Pay
            amount: amount, // Use the amount passed as a prop
        };

        try {
            const response = await fetch('/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Payment processed successfully:', data);
                // Handle successful payment (e.g., redirect to confirmation page)
            } else {
                console.error('Payment processing failed:', data);
                // Handle error (e.g., show error message to user)
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <div>
            <div id="amazonPayButton"></div> {/* This is where the Amazon Pay button will be rendered */}
        </div>
    );
};

export default AmazonPayButton;