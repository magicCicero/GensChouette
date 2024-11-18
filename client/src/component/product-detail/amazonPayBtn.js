/* global amazon */

import React, { useEffect, useState } from 'react';

const AmazonPayButton = ({ amount }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (window.amazon) {
            console.log("Amazon Pay SDK loaded");
            window.onAmazonLoginReady = function () {
                amazon.Login.setClientId(process.env.REACT_APP_AMAZON_PAY_CLIENT_ID);
            };

            try {
                console.log("Attempting to render Amazon Pay button");
                amazon.Pay.renderButton('amazonPayButton', {
                    type: 'PwA',
                    color: 'Gold',
                    size: 'medium',
                    onPaymentAuthorize: handlePayment,
                });
            } catch (error) {
                console.error("Error rendering Amazon Pay button:", error);
            }
        } else {
            console.error('Amazon Pay SDK not loaded');
        }
    }, []);

    const handlePayment = async (orderReferenceId) => {
        setLoading(true);
        setError(null);

        const orderData = {
            orderReferenceId: orderReferenceId,
            amount: amount,
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
                setError(data.error || 'Payment processing failed');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setError('An error occurred during payment processing');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div id="amazonPayButton"></div>
            {loading && <p>Processing payment...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default AmazonPayButton;
