(function () {

    var salary = {};

    salary.calculateNetto = (brutto, children, supportedMembers, city) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();
        
        let deduction = 0;
        let surtaxPercentage = 0;
        let supportedMembersDeduction = 0;
        switch(this.city){
            case "zagreb":
                surtaxPercentage = 0.18;
                break;
            case "osijek":
                surtaxPercentage = 0.13;
                break;
            case "zadar":
                surtaxPercentage = 0.12;
                break;
            case "split":
                surtaxPercentage = 0.15;
                break;
            case "bjelovar":
                surtaxPercentage = 0.06;
                break;
            case "koprivnica":
                surtaxPercentage = 0.10;
                break;
            default:
                surtaxPercentage = 0.10;
                break;
        }

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

    }


    module.exports = salary;

});