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
        console.log('Available values:', event.queryStringParameters);  // eslint-disable-line
        const description = event.queryStringParameters.error_description || 'An unknown error occured';
        console.log('error_description', description); // eslint-disable-line
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
        const mode = JSON.parse(Buffer.from(event.queryStringParameters.state, 'base64').toString()).mode;
        const stripe = getStripe(mode);
        const tokenResponse = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: event.queryStringParameters.code
        });

        if (tokenResponse.livemode === undefined) {
            throw new Error('No livemode received');
        }

        if (tokenResponse.access_token === undefined) {
            throw new Error('No access_token received');
        }

        if (tokenResponse.stripe_publishable_key === undefined) {
            throw new Error('No stripe_publishable_key received');
        }

        if (tokenResponse.stripe_user_id === undefined) {
            throw new Error('No stripe_user_id received');
        }

        const accountDetails = await stripe.accounts.retrieve(tokenResponse.stripe_user_id);

        const token = encodeStripeTokenData(tokenResponse, accountDetails, event.queryStringParameters.state);

        return {
            statusCode: 200,
            body: token
        };
    } catch (err) {
        console.log('Stripe Error:\n', err); // eslint-disable-line
        return {
            statusCode: 500,
            body: err.message
        };
    }
}

/**
 * @param {'live' | 'test'} mode
 *
 * @returns {import('stripe').default}
 */
function getStripe(mode) {
    const {Stripe} = require('stripe').default;

    const CLIENT_SECRET = mode === 'live' ? process.env.CLIENT_SECRET : process.env.TEST_CLIENT_SECRET;

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
 * @param {import('stripe').default.Account} accountDetails
 * @param {string} s - The state query param from the request
 *
 * @returns {string}
 */
function encodeStripeTokenData(tokenResponse, accountDetails, s) {
    const {livemode: l, access_token: a, stripe_publishable_key: p, stripe_user_id: i} = tokenResponse;

    const n = accountDetails.settings && accountDetails.settings.dashboard.display_name;

    return Buffer.from(JSON.stringify({l, a, p, s, n, i})).toString('base64');
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
