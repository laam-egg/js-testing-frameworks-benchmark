class BaseExporter {
    constructor(configNames) {
        if (!Array.isArray(configNames) || configNames.length == 0) {
            throw new Error(`Invalid config names: ${configNames}`);
        }
        this.configNames = [];
        for (const configName of configNames) {
            this.configNames.push("" + configName);
        }

        this.data = [];
        // Data format:
        /*
        [
            {
                sourceTypeName: "one flat suite",
                data: [timeOfConfig1InSeconds, timeOfConfig2, ...]
            }, {
                sourceTypeName: "...",
                ...
            }, ...
        ]
        */
    }

    addSourceType(sourceTypeName, data) {
        if (!Array.isArray(data)) {
            throw new Error(`Invalid data: ${data}`);
        }
        if (data.length !== this.configNames.length) {
            throw new Error(`Invalid data length ${data.length} vs number of configs (${this.configNames.length}). Data: ${data}`);
        }
        sourceTypeName = "" + sourceTypeName;

        this.data.push({
            sourceTypeName,
            data,
        });
    }

    doExport(metadata) {
        throw new Error("Export feature not implemented");
    }

    export(additionalData) {
        const metadata = Object.assign(
            {},
            additionalData,
            {
                configNames: this.configNames,
                dataOfAllSourceTypes: this.data,
            }
        );
        this.doExport(metadata);
    }
}

module.exports = { BaseExporter };
