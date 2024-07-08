import { co2 } from '@tgwf/co2';

function getPageWeight() {
    const performance = window.performance.getEntriesByType('resource');
    const transferSize = performance.reduce((acc, resource) => acc + resource.transferSize, 0);
    return transferSize;
}

const estimateEmissions = (pageWeight) => {
    const model = new co2({ model: "swd", version: 4 });
    const emissions = model.perByteTrace(pageWeight);
    return emissions;
}

export default function pageEmissionsEstimate() {
    let pageWeight = 0;
    pageWeight = getPageWeight();
    const emissions = estimateEmissions(pageWeight);
    const images = document.querySelectorAll("img")

    window.addEventListener("load", function() {
        console.log(`Page emissions estimate: ${new Date()}`);
        console.log('Page weight:', pageWeight);
        console.log('Emissions:', emissions);

        // Optional, update the DOM with the emissions results
        document.getElementById("co2-emissions").innerHTML = emissions.co2.toFixed(3);
    }, false);

    images.forEach(image => {
        image.addEventListener("load", function() {
        console.log('Image loaded!', image.src)
        console.log(`Page emissions estimate: ${new Date()}`);
        pageWeight = getPageWeight();
        console.log('Page weight:', pageWeight, 'bytes');
        const emissions = estimateEmissions(pageWeight);
        console.log('Emissions:', emissions);
        document.getElementById("co2-emissions").innerHTML = emissions.co2.toFixed(3);
        })
    })

    // setInterval(() => {
    //     console.log(`Page emissions estimate: ${new Date()}`);
    //     pageWeight = getPageWeight();
    //     console.log('Page weight:', pageWeight, 'bytes');
    //     const emissions = estimateEmissions(pageWeight);
    //     console.log('Emissions:', emissions);
    //     document.getElementById("co2-emissions").innerHTML = emissions.co2.toFixed(3);
    // }, 10000);

}
