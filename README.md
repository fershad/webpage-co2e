# Estimating Web Page CO2e with Performance Resource Timing API & CO2.js

This page is a demonstration of how the [Performance Resource Timing API](https://developer.mozilla.org/en-US/docs/web/api/performanceresourcetiming) can be used with [CO2.js](https://github.com/thegreenwebfoundation/co2.js/tree/main) on a web page. It is a demonstration repository for the concepts outlined in the blog post [_Including user interaction in website carbon estimates_](https://www.fershad.com/writing/including-user-interaction-in-website-carbon-esimates).

This page contains three lazy-loaded images.

At present, a script runs when the page is loaded. This script uses the Performance Resource Timing API to collect information about the data transferred when the pay was loaded. This information is then fed into CO2.js which uses it to provide a carbon emissions estimate based on the Sustainable Web Design Model version 4. The script also reruns each time a new image on the page is loaded by the browser. Whenever a new image loads, the resulting CO2e estimate is calculated and updated in a sticky banner on the left of the page. It also logs a trace of the estimation in the console.

_At the moment this, demonstration does not make any adjustments to grid intensity based on server location or user location, nor does it make any checks to see if the web page is hosted on a Green web host. This should be noted as changes to these variables would affect the final carbon emissions estimate produced on this page._

## Demo

View online at: [https://fershad.github.io/webpage-co2e/](https://fershad.github.io/webpage-co2e/)

## Run locally

1. Clone this repository.
2. Navigate to root folder for this project on your device.
3. Run `npm run start`. This will install the `http-server` package and spin up a local server.
4. Visit [http://localhost:8080](http://localhost:8080) to view the demo.
