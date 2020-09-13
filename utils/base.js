exports.calcBase = (income, taxRelief) => {
    this.income = income;
    this.taxRelief = taxRelief;
    let base = 0;

    if( this.income - this.taxRelief > 0) {
        base = this.income - this.taxRelief;
    } else {
        base = 0;
    }

    return base;
}