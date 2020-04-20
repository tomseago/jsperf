/**
 * Takes results output from the methodAnalyzer and produces nice looking
 * console messages.
 *
 */
function resultPrinter(results, options) {

    const opts = Object.assign({
        sortBy: "totalTime",
    }, options);

    if ( ! ["name", "totalTime"].find(e => e === opts.sortBy) ) {
        throw new Error("Invalid sortBy value");
    }

    const sortedResults = [...results].sort( (a, b) => {
        switch(opts.sortBy) {
            case "name":
                return a.name.localeCompare(b.name);

            case "totalTime":
                return b.totalTime - a.totalTime;
        }
    });

    if (typeof window !== "undefined") {
        // We're in a browser
        sortedResults.forEach( (result) => {
            console.log(result);
        });
    } else {
        // We're in node
        const util = require("util");

        sortedResults.forEach( (result) => {
            console.log(util.inspect(result, { breakLength: Infinity, colors: true }));
        })
    }
}

if (module) {
    module.exports =  resultPrinter;
}
