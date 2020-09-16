const { surtaxPercentage } = require("./netto");

exports.getTc36 = (surtaxPercentage) => {
    this.surtaxPercentage = surtaxPercentage;

    const sc = this.surtaxPercentage + 1;

    const tc36 = ((36 * sc)/ (100 - (36 * sc))) + 1;

    return tc36;

}