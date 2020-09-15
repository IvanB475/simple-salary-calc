exports.calcBrutto = (netto, taxRelief, taxCoefficient) => {
    this.netto = netto;
    this.taxRelief = taxRelief;
    this.taxCoefficient = taxCoefficient;

    const ntr = this.netto - this.taxRelief;
    const tc =  1 - ( 0.24 * this.taxCoefficient);
    const t = (ntr / tc) + this.taxRelief;
    const brutto = t / 0.80;

    return brutto;
}