## Dappley Metrics API in Go
The API for displaying the metrics of Dappley.

### Environment Requirement
Golang version >= 1.14

### Configuration and Build
1. Update the "host" and "port" in dappley-metrics-go-api/metrics_api/default.conf to those of the dapp node that the API is to connect.

2. Build
```bash
cd metrics_api
go build
```

### Running API
```bash
./metrics_api
```

## Dappley Metrics Client

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This frontend displays the plots of the metrics of the Dapply (https://github.com/dappley/go-dappley).

### Environment Requirement

NodeJS version >= 14.15 \
NPM verison >= 6.14

### Build and Configuration
1. Import dependencies

```bash
cd dappley-metrics-client
npm install
```

2. Open dappley-metrics-client/src/config.json and update "SERVER_URL" to the address of API. If the project is running locally, the "SERVER_URL" would be [http://localhost:9000](http://localhost:9000).

### Running Client
```bash
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
