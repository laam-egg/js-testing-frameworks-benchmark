const functions = require("../functions");
const { writeFileSync } = require("node:fs");

module.exports = function (config) {
    let nestLevel = 1;
    let src = "";
    let imports = "";
    for (const func of functions) {
        imports += `const { ${func.name} } = require("../functions/${func.name}.js");\n`;
        src += config.testSuite(
            func.name,

            func.isAsync ? (
                config.testCaseAsync(func.name, config.assertTrue(`await ${func.name}()`))
            ) : (
                config.testCaseSync(func.name, config.assertTrue(`${func.name}()`))
            ),
        );
        for (let i = 0; i < nestLevel; ++i) {
            src = config.testSuite(`wrapper ${i}`, src);
        }
        nestLevel *= 2;
    }

    src = config.file(imports + src);
    const fileName = config.fileName("deeplyNestedSuites");
    writeFileSync(fileName, src);
}
