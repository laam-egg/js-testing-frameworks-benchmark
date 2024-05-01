function asyncHeavy() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

module.exports = { asyncHeavy };
