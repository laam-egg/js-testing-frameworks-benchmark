module.exports = {
    npxExecutableName: "jest",
    pre: "rm -rf ./__tests__ && mkdir ./__tests__",
    post: "echo", // "rm -rf ./__tests__",
    fileName: (name) => `./__tests__/${name}.test.js`,
    file: (code) => code,
    testSuite: (title, code) => `describe("${title}", () => { ${code} });`,
    testCase: (title, code) => `test("${title}", async () => { ${code} });`,
    beforeAll: (code) => `beforeAll(async () => { ${code} });`,
    beforeEach: (code) => `beforeEach(async () => { ${code} });`,
    afterAll: (code) => `afterAll(async () => { ${code} });`,
    afterEach: (code) => `afterEach(async () => { ${code} });`,
    assertTrue: (code) => `expect(${code}).toBe(true);`,
};
