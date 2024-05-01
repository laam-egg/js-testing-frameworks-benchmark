const { exec } = require("child_process");
const configs = require("../configs");
const functions = require("../functions");
const { writeFileSync } = require("fs");

function generateSrc_DeeplyNestedSuites(config) {
    let nestLevel = 1;
    let src = "";
    let imports = "";
    for (const func of functions) {
        imports += `const { ${func.name} } = require("../functions/${func.name}.js");\n`;
        src += config.testSuite(
            func.name,
            config.testCase(
                func.name,
                `await ${func.name}() ; ` + config.assertTrue("true"),
            ),
        );
        for (let i = 0; i < nestLevel; ++i) {
            src = config.testSuite(`wrapper ${i}`, src);
        }
        nestLevel *= 2;
    }

    src = config.file(imports + src);
    return { src, desiredFileName: "deeplyNestedSuites" };
}

function generateSrc_OneFlatSuite(config) {
    let src = "";
    let imports = "";
    for (const func of functions) {
        imports += `const { ${func.name} } = require("../functions/${func.name}.js");\n`;
        src += config.testCase(
            func.name,
            `await ${func.name}() ; ` + config.assertTrue("true"),
        );
    }
    src = config.testSuite("one large suite", src);
    src = config.file(imports + src);
    return { src, desiredFileName: "oneFlatSuite" };
}

const sourceBuilders = [
    { name: "deeply nested suites", builder: generateSrc_DeeplyNestedSuites },
    { name: "one flat suite", builder: generateSrc_OneFlatSuite },
];

async function runConfig(sampleTimes, config, sourceBuilder) {
    // Write to file
    const { src, desiredFileName } = sourceBuilder(config);
    await new Promise((resolve, reject) => exec(config.pre, (err) => err ? reject(err) : resolve()));
    const fileName = config.fileName(desiredFileName);
    writeFileSync(fileName, src);

    // Run tests
    let meanTime = 0;
    let totalTime = 0;
    for (let i = 0; i < sampleTimes; ++i) {
        const time = await new Promise((resolve, reject) => {
            exec([
                "/usr/bin/time",
                "-f",
                '"%e"',
                "bash -c \"npx",
                [
                    config.npxExecutableName,
                    ...(config.addCommandLineArguments || []),
                    ">/dev/null 2>/dev/null",
                ].join(' ').replace('"', '\\"'),
                "\"",
            ].join(' '), (err, stdout, stderr) => {
                if (err) return reject(err);
                const regex = /^\s*(\d+\.\d+)\s*$/;
                const m = stderr.match(regex);
                if (!m) {
                    return reject(new Error(stderr));
                }
                return resolve(+m[1]);
            });
        });
        totalTime += time;
    }
    meanTime = totalTime / sampleTimes;

    await new Promise((resolve, reject) => exec(config.post, (err) => err ? reject(err) : resolve()));
    return { meanTime, totalTime };
}

async function main() {
    const sampleTimes = (
        process.argv.length >= 3 ? +(process.argv[2]) : NaN
    ) || 3;
    console.log(`Sample times = ${sampleTimes}`);
    
    const results = [];
    for (const sourceBuilder of sourceBuilders) {
        for (const configName in configs) {
            const caseName = `${configName} (${sourceBuilder.name})`;
            console.log(`Running ${caseName}`);
            const { meanTime, totalTime } = await runConfig(sampleTimes, configs[configName], sourceBuilder.builder);
            results.push({
                case: caseName,
                meanTime,
                totalTime,
            });
        }
    }

    results.sort((a, b) => a.meanTime - b.meanTime);
    console.table(results);
}

main();
