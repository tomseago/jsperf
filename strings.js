
// Inspired by https://medium.com/better-programming/5-ways-to-reverse-a-string-in-javascript-466f62845827

function reverseIteratedFor(str){
    let reversed = "";
    for (var i = str.length - 1; i >= 0; i--){
        reversed += str[i];
    }
    return reversed;
}

function reverseForOf(str){
    let reversed = "";
    for(let char of str){
        reversed = char + reversed;
    }
    return reversed;
}

function reverseArrayJoin(str){
    return str.split("").reverse().join("");
}

function reverseSpreadArray(str){
    return [...str].reverse().join('');
}

function reverseReduce(str){
    return str.split("").reduce((rev, char)=> char + rev, '');
}

function reverseRecursion(str){
    if(str === ""){
        return str;
    }else{
        return reverseRecursion(str.substr(1)) + str[0];
    }
}

function reverseRecursionTernary(str){
    return str ? reverseRecursionTernary(str.substr(1)) + str[0] : str;
}

const stringMethods = [
    reverseIteratedFor,
    reverseForOf,
    reverseArrayJoin,
    reverseSpreadArray,
    reverseReduce,
    reverseRecursion,
    reverseRecursionTernary,
];

////////////////////////////////////////////////////////////////////////////////

if (module && !module.parent) {
    // We are running in node and this file have been executed directly as the
    // main module from the command line
    const methodAnalyzer = require("./methodAnalyzer");
    const resultPrinter = require("./resultPrinter");


    const input = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const results = methodAnalyzer(stringMethods, input, { runPerMethod: 1000000 });
    resultPrinter(results);
}
