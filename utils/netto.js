exports.calcNetto = (income, base, surtaxPercentage) => {
    this.income = income;
    this.base = base;
    this.surtaxPercentage = surtaxPercentage;
    let tax = 0;
    let surtax = 0;
    let netto = 0;

    if (this.income < 17500) {
        tax = this.base * 0.24;
        surtax = tax * this.surtaxPercentage;
        if ( tax < 0) {
            netto = this.income;
        } else {
            netto = this.income - ( tax + surtax );
        }
    } else {
        tax = this.base * 0.36;
        surtax = tax * this.surtaxPercentage;
        netto = this.income - ( tax + surtax );
    }
    netto = netto.toFixed(2);

    return netto;
}