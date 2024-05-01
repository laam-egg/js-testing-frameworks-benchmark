module.exports = {
    npxExecutableName: "mocha",
    pre: "rm -rf ./test && mkdir ./test",
    post: "echo", // "rm -rf ./test",
    fileName: (name) => `./test/${name}.test.js`,
    file: (code) => `const assert = require("assert"); ${code}`,
    testSuite: (title, code) => `describe("${title}", function () { ${code} });`,
    testCase: (title, code) => `it("${title}", async function () { ${code} });`,
    beforeAll: (code) => `before(async function () { ${code} });`,
    beforeEach: (code) => `beforeEach(async function () { ${code} });`,
    afterAll: (code) => `after(async function () { ${code} });`,
    afterEach: (code) => `afterEach(async function () { ${code} });`,
    assertTrue: (code) => `assert(true === ${code});`,
};
