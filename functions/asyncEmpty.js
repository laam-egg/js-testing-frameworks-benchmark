function asyncEmpty() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 0);
    });
}

module.exports = { asyncEmpty };
