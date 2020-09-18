const sp = require("./utils/surtaxPercentage");
const c = require("./utils/children");
const sm = require("./utils/supportedMembers");
const p = require("./utils/pensions");
const b = require("./utils/base");
const n = require("./utils/netto");
const hi = require("./utils/healthInsurance");
const tc = require("./utils/taxCoefficient");
const cb = require("./utils/calculateBrutto");
const tc36 = require("./utils/taxCoefficient36");

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

        const { netto } = n.calcNetto(income, base, surtaxPercentage);

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

    salary.detailedListing = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec, city = 'zagreb', hours = 160, overtime = 0, vacation = 0, sickLeave = 0, holiday = 0, nightShift = 0) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
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

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);

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
            surtaxPercentage,
            overtimeTotal,
            vacationTotal,
            sickLeaveTotal,
            holidayTotal,
            nightShiftTotal,
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

    salary.brutto2ToBrutto = (brutto2) => {
        this.brutto2 = brutto2;

        brutto = this.brutto2 / 1.165; 

        return brutto;

    }

    salary.brutto2ToNetto = (brutto2, children = 0, supportedMembers = 0, city = "zagreb") => {
        this.brutto2 = brutto2;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();

        const brutto = salary.brutto2ToBrutto(this.brutto2);

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);

        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const { pensionOne, pensionTwo } = p.calcPensions(brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = brutto - totalFee;

        const base = b.calcBase(income, taxRelief);

        const { netto } = n.calcNetto(income, base, surtaxPercentage);

        return netto; 

    }

    salary.brutto2ToNettoDetailed = (brutto2, children = 0, supportedMembers = 0, city = "zagreb") => {
        this.brutto2 = brutto2;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();

        const brutto = salary.brutto2ToBrutto(this.brutto2);

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);

        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const { pensionOne, pensionTwo } = p.calcPensions(brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = brutto - totalFee;

        const base = b.calcBase(income, taxRelief);

        const healthInsurance = hi.calcHealthInsurance(brutto);

        const nettoCalculation = n.calcNetto(income, base, surtaxPercentage);

        const { netto, tax, surtax } = nettoCalculation;

        const result = {
            brutto,
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
            brutto2: this.brutto2,
            netto
        }
        
        return result;
    }

    salary.nettoToBrutto = ( netto, children = 0, supportedMembers = 0, city = "zagreb") => {
        this.netto = netto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);
        
        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const taxCoefficient = tc.getTc(surtaxPercentage);

        const brutto = cb.calcBrutto(netto, taxRelief, taxCoefficient);

        return brutto;

    }

    salary.nettoToBruttoDetailed = (netto, children = 0, supportedMembers = 0, city = "zagreb") => {
        this.netto = netto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();

        const surtaxPercentage = sp.calcSurtaxPercentage(this.city);
        
        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const taxCoefficient = tc.getTc(surtaxPercentage);

        const taxCoefficient36 = tc36.getTc36(surtaxPercentage);

        const brutto = cb.calcBrutto(this.netto, taxRelief, taxCoefficient, taxCoefficient36);

        const { pensionOne, pensionTwo } = p.calcPensions(brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = brutto - totalFee;

        const base = b.calcBase(income, taxRelief);
        
        const healthInsurance = hi.calcHealthInsurance(brutto);

        const brutto2 = brutto + healthInsurance;

        const nettoCalculation = n.calcNetto(income, base, surtaxPercentage);

        const { tax, tax36, totalTax, surtax } = nettoCalculation;

        return {
            netto, 
            deduction,
            supportedMembersDeduction,
            taxRelief,
            pensionOne,
            pensionTwo,
            totalFee,
            income,
            base,
            tax,
            tax36,
            totalTax,
            surtax,
            healthInsurance,
            brutto2,
            brutto
        }


    }

    module.exports = salary;

}());