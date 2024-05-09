const { BaseExporter } = require("./BaseExporter");
const ejs = require("ejs");
const { readFileSync, writeFileSync, mkdirSync } = require("node:fs");

class HtmlExporter extends BaseExporter {
    doExport(metadata) {
        const template = readFileSync(__dirname + "/../templates/index.ejs", {
            encoding: 'utf-8',
            flag: 'r',
        });
        const html = ejs.render(template, metadata);

        const basePath = __dirname + "/../results/html/";
        mkdirSync(basePath, { recursive: true });
        writeFileSync(basePath + "index.html", html);
    }
}

module.exports = { HtmlExporter };
