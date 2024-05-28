import { co2 } from '@tgwf/co2';

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

export default async function pageEmissionsEstimate(options = { interval: 5000 }) {
    const { interval } = options;
    console.log('Page emissions estimate');
    let pageWeight = 0;
    setInterval(() => {
        pageWeight = getPageWeight();
        console.log('Page weight:', pageWeight);
        const emissions = estimateEmissions(pageWeight);
        console.log('Emissions:', emissions);
    }, interval);

}
