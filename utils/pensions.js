exports.calcPensions = function (brutto) {
    this.brutto = brutto;
    let pensionOne = 0;
    let pensionTwo = 0;


    if( this.brutto > 52452 ) {
        pensionOne = 52452 * 0.15;
        pensionTwo = 52452 * 0.05;
    } else {
        pensionOne = this.brutto * 0.15;
        pensionTwo = this.brutto * 0.05;
    }

    return { pensionOne, pensionTwo };
}
