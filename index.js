import { co2 } from 'https://esm.sh/@tgwf/co2@latest';

function getPageWeight() {
    const performance = window.performance.getEntriesByType('resource');
    const transferSize = performance.reduce((acc, resource) => acc + resource.transferSize, 0);
    return transferSize;
}

const estimateEmissions = (pageWeight) => {
    const model = new co2();
    const emissions = model.perByteTrace(pageWeight);
    return emissions;
}

export default async function pageEmissionsEstimate(options = {}) {
    const { updateId } = options;
    console.log('Page emissions estimate');
    let pageWeight = 0;

    window.addEventListener("load", function() {
        pageWeight = getPageWeight();
        console.log('Page weight:', pageWeight);
        const emissions = estimateEmissions(pageWeight);
        console.log('Emissions:', emissions);

        // Optional, update the DOM with the emissions results
        updateId.map((id) => {
            const element = document.getElementById(id);
            element.innerHTML = emissions.co2;
        });
    }, false);
    // setInterval(() => {
    //     pageWeight = getPageWeight();
    //     console.log('Page weight:', pageWeight);
    //     const emissions = estimateEmissions(pageWeight);
    //     console.log('Emissions:', emissions);
    // }, interval);

}
