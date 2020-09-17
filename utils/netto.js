exports.calcNetto = (income, base, surtaxPercentage) => {
    this.income = income;
    this.base = base;
    this.surtaxPercentage = surtaxPercentage;
    let tax = 0;
    let tax36 = 0;
    let surtax = 0;
    let netto = 0;
    let totalTax = 0;


    if(this.base > 30000) {
        tax36 = (this.base - 30000) * 0.36;
    }

    if (this.base < 30000) {
        tax = this.base * 0.24;
        if ( tax <= 0) {
            netto = this.income;
        } else {
            netto = this.income - ( tax + surtax );
        }
    } else {
        tax = 30000 * 0.24;

        netto = this.income - ( tax + surtax );
    }

    totalTax = tax + tax36;
    surtax = totalTax * this.surtaxPercentage;
    netto = netto.toFixed(2);

    return { tax, tax36, totalTax, surtax, netto};
}