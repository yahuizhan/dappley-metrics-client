# Dappley Metrics Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This web application displays the plots of the metrics of the Dapply protocal (https://github.com/dappley/go-dappley).

The backend API that supports this web application can be found here: https://github.com/yahuizhan/dappley-metrics-go-api.

## Environment Requirement

NodeJS version >= 14.15 \
NPM verison >= 6.14

## Build
1. Checkout repo

```bash
git clone https://github.com/yahuizhan/dappley-metrics-client.git
```

2. Import dependencies and build.

```bash
cd dappley-metrics-client
npm install
```

## Configuration
Open dappley-metrics-client/src/config.json and update "SERVER_URL" to the address of API

## Running App
```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
