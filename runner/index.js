const { exec } = require("child_process");
const configs = require("../configs");
const sourceTypes = require("../source_types");
const { writeFileSync } = require("fs");

async function runConfig(sampleTimes, config, sourceBuilder) {
    if (config.pre) await new Promise((resolve, reject) => exec(config.pre, (err) => err ? reject(err) : resolve()));
    
    // Write to file
    const { src, desiredFileName } = sourceBuilder(config);
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
                    return reject(new Error(`STDOUT: #${stdout}# STDERR: #${stderr}#`));
                }
                return resolve(+m[1]);
            });
        });
        totalTime += time;
    }
    meanTime = totalTime / sampleTimes;

    if (config.post) await new Promise((resolve, reject) => exec(config.post, (err) => err ? reject(err) : resolve()));
    return { meanTime, totalTime };
}

async function main() {
    const sampleTimes = (
        process.argv.length >= 3 ? +(process.argv[2]) : NaN
    ) || 3;
    console.log(`Sample times = ${sampleTimes}`);
    
    const results = [];
    for (const sourceType of sourceTypes) {
        for (const configName in configs) {
            const caseName = `${configName} (${sourceType.name})`;
            console.log(`Running ${caseName}`);
            const { meanTime, totalTime } = await runConfig(sampleTimes, configs[configName], sourceType.builder);
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
