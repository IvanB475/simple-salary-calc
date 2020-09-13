exports.calcPensions = (brutto) => {
    this.brutto = brutto;
    let pensionOne = 0;
    let pensionTwo = 0;


    if( this.brutto > 12652 ) {
        pensionOne = 12652 * 0.15;
        pensionTwo = 12652 * 0.05;
    } else {
        pensionOne = this.brutto * 0.15;
        pensionTwo = this.brutto * 0.05;
    }

    return { pensionOne, pensionTwo };
}
