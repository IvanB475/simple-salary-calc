exports.calcDeduction = (children) => {
    this.children = children;
    let deduction = 0;
    switch(this.children) {
        case 1:
            deduction = 4000 + (2500 * 0.7);
            break;
        case 2:
            deduction = 4000 + (2500 * 1.7);
            break;
        case 3: 
            deduction = 4000 + (2500 * 3.1);
            break;
        default: 
            deduction = 4000;
    }

    return deduction;
}