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

    salary.netto = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city.toLowerCase();
        

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);

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

    salary.nettoDetailed = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') => {
        this.brutto = brutto;
        this.children = children;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.supportedMembers = supportedMembers;
        this.city = city.toLowerCase();
        

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

        const { netto, tax, tax36, totalTax, surtax, totalTaxSurtax } = nettoCalculation;

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
            tax36,
            totalTax,
            surtax,
            totalTaxSurtax,
            healthInsurance,
            brutto2,
            netto
        }
        
        return result;
    }

    salary.detailedListing = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb', hours = 160, overtime = 0, vacation = 0, sickLeave = 0, sickLeave80 = 0, sickLeave100 = 0, holiday = 0, nightShift = 0, co = 1.3, cv = 1, csl = 0.70, ch = 1, cn = 1.5) => {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city;
        this.hours = hours;
        this.overtime = overtime;
        this.vacation = vacation;
        this.sickLeave = sickLeave;
        this.sickLeave80 = sickLeave80;
        this.sickLeave100 = sickLeave100;
        this.holiday = holiday;
        this.nightShift = nightShift;
        this.co = co;
        this.cv = cv;
        this.csl = csl;
        this.ch = ch;
        this.cn = cn;

        const hourly = this.brutto / this.hours; 
        const overtimeTotal = this.overtime * ( hourly * co);
        const vacationTotal = this.vacation * (hourly * cv);
        const sickLeaveTotal = this.sickLeave * ( hourly * csl);
        const sickLeave80Total = this.sickLeave80 * ( hourly * 0.80);
        const sickLeave100Total = this.sickLeave100 * hourly;
        const holidayTotal = this.holiday * (hourly * ch);
        const nightShiftTotal = this.nightShift * (hourly * cn);

        this.brutto = this.brutto + overtimeTotal + vacationTotal + sickLeaveTotal + sickLeave80Total + sickLeave100Total + holidayTotal + nightShiftTotal;

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

        const { netto, tax, tax36, surtax, totalTax } = nettoCalculation;

        const result = {
            brutto: this.brutto,
            hourly,
            surtaxPercentage,
            overtimeTotal,
            vacationTotal,
            sickLeaveTotal,
            sickLeave80Total,
            sickLeave100Total,
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
            tax36,
            surtax,
            totalTax,
            totalTaxSurtax,
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

    salary.brutto2ToNetto = (brutto2, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => {
        this.brutto2 = brutto2;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city.toLowerCase();

        const brutto = salary.brutto2ToBrutto(this.brutto2);

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);

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

    salary.brutto2ToNettoDetailed = (brutto2, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => {
        this.brutto2 = brutto2;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city.toLowerCase();

        const brutto = salary.brutto2ToBrutto(this.brutto2);

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);

        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const { pensionOne, pensionTwo } = p.calcPensions(brutto);

        const totalFee = pensionOne + pensionTwo;

        const income = brutto - totalFee;

        const base = b.calcBase(income, taxRelief);

        const healthInsurance = hi.calcHealthInsurance(brutto);

        const nettoCalculation = n.calcNetto(income, base, surtaxPercentage);

        const { netto, tax, tax36, totalTax, surtax, totalTaxSurtax } = nettoCalculation;

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
            tax36,
            totalTax,
            surtax,
            totalTaxSurtax,
            base,
            healthInsurance,
            brutto2: this.brutto2,
            netto
        }
        
        return result;
    }

    salary.nettoToBrutto = ( netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => {
        this.netto = netto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city.toLowerCase();

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);
        
        const deduction = c.calcDeduction(this.children);

        const supportedMembersDeduction = sm.calcSmDeduction(this.supportedMembers);

        const taxRelief = deduction + supportedMembersDeduction;

        const taxCoefficient = tc.getTc(surtaxPercentage);

        const brutto = cb.calcBrutto(netto, taxRelief, taxCoefficient);

        return brutto;

    }

    salary.nettoToBruttoDetailed = (netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => {
        this.netto = netto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city.toLowerCase();

        const surtaxPercentage = this.surtaxPercentageDec || sp.calcSurtaxPercentage(this.city);
        
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

        const { tax, tax36, totalTax, surtax, totalTaxSurtax } = nettoCalculation;

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
            totalTaxSurtax,
            healthInsurance,
            brutto2,
            brutto
        }


    }

    module.exports = salary;

}());