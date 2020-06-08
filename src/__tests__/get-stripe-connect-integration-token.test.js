const getStripeConnectIntegrationToken = require('../../functions/get-stripe-connect-integration-token/get-stripe-connect-integration-token');

describe('get-stripe-coonnect-integration-token', function () {
    it('exports a handler function', function () {
        expect(typeof getStripeConnectIntegrationToken.handler).toBe('function');
    });

    it('Responds with 405 when method is not POST', async function () {
        const response = await getStripeConnectIntegrationToken.handler({
            httpMethod: 'GET',
            path: '/',
            headers: {},
            queryStringParameters: {},
            body: '',
            isBase64Encoded: false
        });

        expect(response.statusCode).toBe(405);
    });

    it('Responds with 500 and error_description when error is present', async function () {
        const response = await getStripeConnectIntegrationToken.handler({
            httpMethod: 'POST',
            path: '/',
            headers: {},
            queryStringParameters: {
                error: 'access_denied',
                error_description: 'This is the error'
            },
            body: '',
            isBase64Encoded: false
        });

        expect(response.statusCode).toBe(500);
        expect(response.body).toBe('This is the error');
    });

    it('Responds with 500 and "An unknown error occured"  when error is present, but missing description', async function () {
        const response = await getStripeConnectIntegrationToken.handler({
            httpMethod: 'POST',
            path: '/',
            headers: {},
            queryStringParameters: {
                error: 'access_denied'
            },
            body: '',
            isBase64Encoded: false
        });

        expect(response.statusCode).toBe(500);
        expect(response.body).toBe('An unknown error occured');
    });

    it('Responds with 400 when the state query is missing', async function () {
        const response = await getStripeConnectIntegrationToken.handler({
            httpMethod: 'POST',
            path: '/',
            headers: {},
            queryStringParameters: {
                code: 'CODE'
            },
            body: '',
            isBase64Encoded: false
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toBe('Missing state query param');
    });

    it('Responds with 400 when the code query is missing', async function () {
        const response = await getStripeConnectIntegrationToken.handler({
            httpMethod: 'POST',
            path: '/',
            headers: {},
            queryStringParameters: {
                state: 'STATE'
            },
            body: '',
            isBase64Encoded: false
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toBe('Missing code query param');
    });
});
