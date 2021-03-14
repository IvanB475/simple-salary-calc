exports.calcHealthInsurance = function (brutto) {
    this.brutto = brutto;

    const healthInsurance = this.brutto * 0.165;

    return healthInsurance;
}