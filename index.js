const sp = require("./utils/surtaxPercentage");
const c = require("./utils/children");
const sm = require("./utils/supportedMembers");
const p = require("./utils/pensions");
const b = require("./utils/base");
const n = require("./utils/netto");
const hi = require("./utils/healthInsurance");

(function () {

    let salary = {};

    salary.netto = (brutto, children = 0, supportedMembers = 0, city = 'zagreb') => {
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

    salary.nettoDetailed = (brutto, children = 0, supportedMembers = 0, city = 'zagreb') => {
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

        const nettoCalculation = n.calcNetto(income, base, surtaxPercentage);

        const { netto, tax, surtax } = nettoCalculation;

        const result = {
            surtaxPercentage,
            deduction,
            supportedMembersDeduction,
            taxRelief,
            pensionOne,
            pensionTwo,
            totalFee,
            income,
            base,
            tax,
            surtax,
            healthInsurance,
            brutto2,
            netto
        }
        
        return result;
    }

    salary.detailedListing = (brutto, children = 0, supportedMembers = 0, city = 'zagreb', hours = 160, overtime = 0, vacation = 0, sickLeave = 0, holiday = 0, nightShift = 0) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city;
        this.hours = hours;
        this.overtime = overtime;
        this.vacation = vacation;
        this.sickLeave = sickLeave;
        this.holiday = holiday;
        this.nightShift = nightShift;

        const hourly = this.brutto / this.hours; 
        const overtimeTotal = this.overtime * ( hourly * 1.3);
        const vacationTotal = this.vacation * hourly;
        const sickLeaveTotal = this.sickLeave * ( hourly * 0.7);
        const holidayTotal = this.holiday * hourly;
        const nightShiftTotal = this.nightShift * (hourly * 1.5);

        this.brutto = this.brutto + overtimeTotal + vacationTotal + sickLeaveTotal + holidayTotal + nightShiftTotal;

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

        const nettoCalculation = n.calcNetto(income, base, surtaxPercentage);

        const { netto, tax, surtax } = nettoCalculation;

        const result = {
            brutto: this.brutto,
            hourly,
            overtimeTotal,
            vacationTotal,
            sickLeaveTotal,
            holidayTotal,
            nightShiftTotal,
            surtaxPercentage,
            deduction,
            supportedMembersDeduction,
            taxRelief,
            pensionOne,
            pensionTwo,
            totalFee,
            income,
            tax,
            surtax,
            base,
            healthInsurance,
            brutto2,
            netto
        }
        
        return result;


    }


    module.exports = salary;

}());