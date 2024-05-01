module.exports = {
    npxExecutableName: "jasmine",
    pre: "npx jasmine init",
    post: "echo", // "rm -rf ./spec",
    fileName: (name) => `./spec/${name}.spec.js`,
    file: (code) => code,
    testSuite: (title, code) => `describe("${title}", () => { ${code} });`,
    testCase: (title, code) => `it("${title}", async () => { ${code} });`,
    beforeAll: (code) => `beforeAll(async () => { ${code} });`,
    beforeEach: (code) => `beforeEach(async () => { ${code} });`,
    afterAll: (code) => `afterAll(async () => { ${code} });`,
    afterEach: (code) => `afterEach(async () => { ${code} });`,
    assertTrue: (code) => `expect(${code}).toBe(true);`,
};
