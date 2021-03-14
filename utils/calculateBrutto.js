
exports.calcBrutto = function (netto, taxRelief, taxCoefficient, taxCoefficient36) {
    this.netto = netto;
    this.taxRelief = taxRelief;
    this.taxCoefficient = taxCoefficient;
    this.taxCoefficient36 = taxCoefficient36;

    let brutto = 0;
    const ca = 30000 - (7200 * this.taxCoefficient) + taxRelief;

    if( this.netto <= this.taxRelief ) {
       brutto = cb1(this.netto); 
    } else if (this.netto <= ca) {
        brutto = cb2(this.netto, this.taxRelief, this.taxCoefficient);
    } else if( this.netto > ca && this.netto <= 41961.60 - ((11961.60 - this.taxRelief) * (0.36 * this.taxCoefficient) + ( 7200 * this.taxCoefficient ))) {
        brutto = cb3(this.netto, this.taxRelief, this.taxCoefficient, this.taxCoefficient36);
    } else {
        brutto = cb4(this.netto, this.taxRelief, this.taxCoefficient, this.taxCoefficient36);
    }

    return brutto;
}


cb1 = (netto) => {
    const brutto = netto * 1.25;
    return brutto;
}

cb2 = (netto, taxRelief, taxCoefficient) => {

    const ntr = netto - taxRelief;
    const tc =  1 - ( 0.24 * taxCoefficient);
    const t = (ntr / tc) + taxRelief;
    const brutto = t / 0.80;

    return brutto;
}

cb3 = (netto, taxRelief, taxCoefficient, taxCoefficient36) => {
    const brutto = (30000 + taxRelief + (netto - (30000 - (7200 * taxCoefficient) + taxRelief) * taxCoefficient36) / 0.80);
    return brutto;
}

cb4 = (netto, taxRelief, taxCoefficient, taxCoefficient36) => {
    const brutto = 30000 + taxRelief + (netto - (30000 - (7200 * taxCoefficient) + taxRelief)) * taxCoefficient36 + 10490.40;
    return brutto;
}