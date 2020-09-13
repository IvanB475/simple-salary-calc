const sp = require("./utils/surtaxPercentage");
const c = require("./utils/children");
const sm = require("./utils/supportedMembers");
const p = require("./utils/pensions");
const b = require("./utils/base");
const n = require("./utils/netto");
const hi = require("./utils/healthInsurance");

(function () {

    let salary = {};

    salary.netto = (brutto, children, supportedMembers, city) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();
        

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);

        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const { pensionOne, pensionTwo } = p.calcPensions(this.brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = this.brutto - totalFee;

        const base = b.calcBase(income, taxRelief);

        const netto = n.calcNetto(income, base, surtaxPercentage);

        return netto; 

    }

    salary.nettoDetailed = (brutto, children, supportedMembers, city) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();
        

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);

        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const { pensionOne, pensionTwo } = p.calcPensions(this.brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = this.brutto - totalFee;

        const base = b.calcBase(income, taxRelief);
        
        const healthInsurance = hi.calcHealthInsurance(this.brutto);

        const brutto2 = this.brutto + healthInsurance;

        const netto = n.calcNetto(income, base, surtaxPercentage);

        const result = {
            surtaxPercentage: surtaxPercentage,
            deduction: deduction,
            supportedMembersDeduction: supportedMembersDeduction,
            taxRelief: taxRelief,
            pensionOne: pensionOne,
            pensionTwo: pensionTwo,
            totalFee: totalFee,
            income: income,
            base: base,
            healthInsurance: healthInsurance,
            brutto2: brutto2,
            netto: netto
        }
        
        return result;
    }



    module.exports = salary;

}());