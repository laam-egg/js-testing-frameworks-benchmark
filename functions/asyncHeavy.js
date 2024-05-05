function asyncHeavy() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}

module.exports = { asyncHeavy };
