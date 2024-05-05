module.exports = [
    { name: "deeply nested suites", builder: require("./deeply_nested_suites") },
    { name: "one flat suite", builder: require("./one_flat_suite") },
    { name: "multiple flat suites, multiple test files", builder: require("./multiple_flat_suites_multiple_files") },
];
