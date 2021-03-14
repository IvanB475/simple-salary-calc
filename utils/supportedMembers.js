exports.calcSmDeduction = function (supportedMembers) {
    this.supportedMembers = supportedMembers;
    let supportedMembersDeduction;
    switch(this.supportedMembers) {
        case 1:
            supportedMembersDeduction = 2500 * 0.7;
            break;
        case 2: 
            supportedMembersDeduction = 2500 * 1.4;
            break;
        case 3:
            supportedMembersDeduction = 2500 * 2.1;
            break;
        default:
            supportedMembersDeduction = 0;
    } 

    return supportedMembersDeduction;
}