# DayTrader

## Overview

Day Trader is an app designed to give amateur investors greater visibility into, and control over their investment portfolio.
In addition the usual functionality available to investors through their brokerage websites, DayTrader is designed to allow the user to:
Visualize the make-up of their portfolio
- Compare stock performance ‘side-by-side’
- Analyze custom scenarios to help them make the right decisions about what to buy/sell next
- Log and update notes and decisions on specific stock holdings

Specifically, and distinct from other investment apps, DayTrader will allow the user to:
- See in one view the performance of different stocks, as well as where and when investments in those stocks were made.
- Show the user select analyst information on those stocks.
- Store observations, actions and notes.
- Log what stocks they have bought / sold, along with the date, quantity and price

Planned enhancements:
- Increase richness of data on each page
- Add authorizations for multi-user access
- Add scraping from other sites as needed
- Improve the graphing visuals - explore other libraries
- Improve the performance
- Further validations


## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

## Database Information

Database name: daytrader
Collections:
tickers
tickerSummary
