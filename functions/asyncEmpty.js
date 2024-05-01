function asyncEmpty() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

module.exports = { asyncEmpty };
