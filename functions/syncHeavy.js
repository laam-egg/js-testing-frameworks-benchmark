function syncHeavy() {
    let k;
    for (let i = 0; i < 10000; ++i) {
        k = new Date();
    }
    return true;
}

module.exports = { syncHeavy };
