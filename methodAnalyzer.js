

// Do all the logic for what timebase we have available on load rather than
// during execution.

let nowMicros = () => Date.now() * 1000.0;

if (typeof performance !== "undefined") {
    nowMicros = performance.now;
}

function analyzeMethods(methods, input, options) {

    const opts = Object.assign({
        runPerMethod: 1000,
        randomOrder: true,
    }, options);

    // Sort the methods into a list that we are going to work on sequentially
    let workOrder = [];

    if (opts.randomOrder) {
        const unChosen = [...methods];
        while (unChosen.length > 0) {
            const ix = Math.floor(Math.random() * unChosen.length);
            workOrder.push(unChosen[ix]);
            unChosen.splice(ix, 1);
        }
    } else {
        workOrder = [...methods];
    }

    // Now iterate on that work collecting the timing information for
    // each method.

    return workOrder.map( (method, runOrder) => {

        // What we're going to report
        const result = {
            name: method.name,
            totalTime: 0,
            avgTime: 0,
            medianTime: 0,
            runOrder,
        };

        const runTimes = new Array(opts.runPerMethod);


        // Collect the individual times
        const totalStart = nowMicros();

        for (let i = 0; i < opts.runPerMethod; i += 1) {
            const start = nowMicros();
            method(input);
            const end = nowMicros();

            runTimes[i] = end - start;
        }

        const totalEnd = nowMicros();

        // Now we analyze
        result.totalTime = totalEnd - totalStart;

        result.avgTime = result.totalTime / runTimes.length;

        runTimes.sort();

        result.medianTime = runTimes[Math.floor(runTimes.length / 2)];

        return result;
    });
}

if (module) {
    // Export for node
    module.exports = analyzeMethods;
}
