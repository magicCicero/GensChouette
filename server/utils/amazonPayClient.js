class AmazonPayClient {
    constructor() {
        const Client = require('@amazonpay/amazon-pay-api-sdk-nodejs');
        const fs = require('fs');
        require("dotenv").config();

        let config = {
            publicKeyId: process.env.PUBLIC_KEY_ID,
            privateKey: fs.readFileSync(process.env.PRIVATE_KEY),
            region: process.env.REGION,
            sandbox: true
        };

        this.testPayClient = new Client.AmazonPayClient(config);
    }
}

module.exports = AmazonPayClient;