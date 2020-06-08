/**
 * @typedef {Object} Event
 * @prop {"POST" | "GET" | "PUT" | "DELETE" | "OPTIONS" | "PATCH"} httpMethod
 * @prop {string} path
 * @prop {Object.<string, string>} headers
 * @prop {Object.<string, string>} queryStringParameters
 * @prop {string} body
 * @prop {boolean} isBase64Encoded
 */

/**
 * @typedef {Object} Response
 * @prop {number} statusCode
 * @prop {string} body
 * @prop {Object.<string, string> =} headers
 * @prop {boolean =} isBase64Encoded
 */

/**
 * @param {Event} event
 *
 * @returns {Promise<Response>}
 */
async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    if (event.queryStringParameters.error) {
        const description = event.queryStringParameters.error_description || 'An unknown error occured';
        return {
            statusCode: 500,
            body: description
        };
    }

    if (!event.queryStringParameters.state) {
        return {
            statusCode: 400,
            body: 'Missing state query param'
        };
    }

    if (!event.queryStringParameters.code) {
        return {
            statusCode: 400,
            body: 'Missing code query param'
        };
    }

    if (event.queryStringParameters.state === 'TESTING') {
        return handleLocalTest(event.queryStringParameters.code);
    }

    try {
        const stripe = getStripe();
        const tokenResponse = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: event.queryStringParameters.code
        });

        const token = encodeStripeTokenData(tokenResponse, event.queryStringParameters.state);

        return {
            statusCode: 200,
            body: token
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: err.message
        };
    }
}

/**
 * @returns {import('stripe').default}
 */
function getStripe() {
    const {Stripe} = require('stripe').default;

    const CLIENT_SECRET = process.env.CLIENT_SECRET;

    if (!CLIENT_SECRET) {
        throw new Error('Incorrectly configured, missing CLIENT_SECRET');
    }

    const stripe = new Stripe(CLIENT_SECRET, {
        apiVersion: '2020-03-02'
    });

    return stripe;
}

/**
 * @param {import('stripe').default.OAuthToken} tokenResponse
 * @param {string} s - The state query param from the request
 *
 * @returns {string}
 */
function encodeStripeTokenData(tokenResponse, s) {
    if (!Reflect.has(tokenResponse, 'livemode')) {
        throw new Error('No livemode received');
    }

    if (!Reflect.has(tokenResponse, 'access_token')) {
        throw new Error('No access_token received');
    }

    if (!Reflect.has(tokenResponse, 'stripe_publishable_key')) {
        throw new Error('No stripe_publishable_key received');
    }

    const {livemode: l, access_token: a, stripe_publishable_key: p} = tokenResponse;

    return Buffer.from(JSON.stringify({l, a, p, s})).toString('base64');
}

/**
 * @param {string} code
 *
 * @returns {Response}
 */
function handleLocalTest(code) {
    if (code === 'SUCCESS') {
        return {
            statusCode: 200,
            body: ('FAKE_TOKEN').repeat(30)
        };
    }
    if (code === 'EXPIRED') {
        return {
            statusCode: 500,
            body: 'This authorization code has already been used. All tokens issued with this code have been revoked.'
        };
    }
    if (code === 'INVALID') {
        return {
            statusCode: 500,
            body: 'Authorization code does not exist: ac_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        };
    }
    if (code === 'CONNECT') {
        return {
            statusCode: 500,
            body: 'An error occurred with our connection to Stripe.'
        };
    }
    return {
        statusCode: 500,
        body: 'An unknown error occured.'
    };
}

module.exports = {
    handler
};
