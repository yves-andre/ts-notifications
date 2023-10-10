const jsdom = require("jsdom");
var fs = require("fs");

const { JSDOM } = jsdom;
const indexFile = "./build/index.html"

JSDOM.fromFile(indexFile).then(dom => {
    const document = dom.window.document
    const css = document.querySelector("link[rel='stylesheet']");
    document.body.appendChild(css);

    fs.writeFile(indexFile, dom.serialize(), err => {
        console.log('Reorder CSS ✅');
    });

});