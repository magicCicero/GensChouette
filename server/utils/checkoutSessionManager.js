const uuidv4 = require('uuid/v4');
module.exports = {
    getCheckoutSession: (checkoutSessionId, testPayClient) => {

        const headers = {
            'x-amz-pay-idempotency-key': uuidv4().toString().replace(/-/g, '')
        };
        response = testPayClient.getCheckoutSession(checkoutSessionId, headers)
        
        return Promise.resolve(response);
    },
    updateCheckoutSession: (checkoutSessionId, testPayClient, CHECKOUT_RESULT_RETURN_URL) => {
        const payload = {
            webCheckoutDetails: {
                checkoutResultReturnUrl: CHECKOUT_RESULT_RETURN_URL
            },
            paymentDetails: {
                paymentIntent: 'Authorize',
                canHandlePendingAuthorization: true,
                chargeAmount: {
                    amount: 30,             //Amount to be charged
                    currencyCode: 'JPY'
                }
            },
            merchantMetadata: {
                merchantReferenceId: 'A12345',
                merchantStoreName: 'Furniture Store',
                noteToBuyer: 'Thank you for purchasing!',
                customInformation: ''
            }
        };

        response = testPayClient.updateCheckoutSession(checkoutSessionId, payload)
        
        return Promise.resolve(response);
    },
    completeCheckoutSession: (checkoutSessionId, webstoreClient) => {

        const payload = {
            chargeAmount: {
                amount: 30.00,
                currencyCode: "JPY"
            }
        }
        ;
        response = webstoreClient.completeCheckoutSession(checkoutSessionId, payload)
        return Promise.resolve(response);
    }
}