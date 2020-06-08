# Stripe

This is a small frontend app which acts as a bridge between individual Ghost instances and the Ghost Foundation's Stripe Connect OAuth flow.

## Usage

Run the application locally and visit the following URL's to test different states.

- http://localhost:8888?state=TESTING&code=SUCCESS
    - Fakes a successful redirect.
    - This will be the majority of all requests
- http://localhost:8888?state=TESTING&code=EXPIRED
    - Fakes a redirect where the params have already been used.
    - This would happen if the user was refreshing the page, we should tell them to go through the process again.
- http://localhost:8888?state=TESTING&code=INVALID
    - Fakes a redirect where the params are incorrect.
    - This would only happen if people were manually trying to enter the URL rather than going through the flow
- http://localhost:8888?state=TESTING&code=CONNECT
    - Fakes a redirect where we have trouble connecting to Stripe.
    - This has only happened once in local testing, we should tell them to retry/go through the process again
- http://localhost:8888?state=TESTING&code=WHATEVA
    - Fakes a redirect where we have an unknown error.
    - This is for unknown errors, similar to above, this happens rarely and should just be retried
- http://localhost:8888?state=TESTING&error=access_denied&error_description=The+user+denied+your+request
    - Fakes a redirect where the user clicks "Cancel" instead of connecting the account.

### Running the end-to-end flow with Ghost Admin

This will use your local Ghost Admin, but the live stripe.ghost.org and so you will need a push to master to test your changes.

Pre-requisites:
- You'll need to create/update config.local.json to set `"stripeDirect": false` to be able to see the new UI
- You'll need Ghost & Ghost-Admin on master and built

Test the flow:
- Visit the labs settings in the Ghost-Admin
- Click the "Connect to Stripe" button in the member settings
- Accept the connection on the Stripe site
- Copy the token from `stripe.ghost.org`
- Paste the token into the input in the Ghost-Admin, below the button you clicked
- Save the settings

## Develop

- `yarn` to install all dependencies
- `netlify link` to link this to the netlify project (Choose "Use current git remote origin (https://github.com/TryGhost/stripe)")

## Run

- `yarn dev` This will spin up a local development server, it should be accessed via one of the URL's above.
- NOTE!!: Visiting http://localhost:8888 directly will redirect you to https://ghost.org


## Publish

- `git push upstream master`

# Copyright & License 

Copyright (c) 2020 Ghost Foundation. All rights reserved.

This code is considered closed-source and not for distribution. There is no opensource license associated with this project.
