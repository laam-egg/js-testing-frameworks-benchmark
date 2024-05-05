const functions = require("../functions");

module.exports = function (config) {
    let src = "";
    let imports = "";
    for (const func of functions) {
        imports += `const { ${func.name} } = require("../functions/${func.name}.js");\n`;
        src += func.isAsync ? (
            config.testCaseAsync(func.name, config.assertTrue(`await ${func.name}()`))
        ) : (
            config.testCaseSync(func.name, config.assertTrue(`${func.name}()`))
        );
    }
    src = config.testSuite("one large suite", src);
    src = config.file(imports + src);
    return { src, desiredFileName: "oneFlatSuite" };
}
