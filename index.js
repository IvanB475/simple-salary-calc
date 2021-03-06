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

    salary.netto = function (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') {
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

    salary.nettoDetailed = function (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') {
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

    salary.detailedListing = function (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb', hours = 160, regularHours = 0, overtime = 0, vacation = 0, sickLeave = 0, sickLeave42 = 0, sickLeave80 = 0, sickLeave100 = 0, holiday = 0, nightShift = 0, standby = 0, reimbursement = 0, stoppage = 0, chr = 1, co = 1.3, cv = 1, csl = 0.70, ch = 1, cn = 1.5, csb = 1.0) {
        this.brutto = brutto;
        this.children = children;
        this.supportedMembers = supportedMembers;
        this.surtaxPercentageDec = surtaxPercentageDec;
        this.city = city;
        this.hours = hours;
        this.regularHours = regularHours;
        this.overtime = overtime;
        this.vacation = vacation;
        this.sickLeave = sickLeave;
        this.sickLeave42 = sickLeave42;
        this.sickLeave80 = sickLeave80;
        this.sickLeave100 = sickLeave100;
        this.holiday = holiday;
        this.nightShift = nightShift;
        this.standby = standby;
        this.reimbursement = reimbursement;
        this.stoppage = stoppage;
        this.chr = chr;
        this.co = co;
        this.cv = cv;
        this.csl = csl;
        this.ch = ch;
        this.cn = cn;
        this.csb = csb;

        console.log(this);

        const hourly = this.brutto / this.hours ; 
        const regularHoursTotal = this.regularHours * (hourly * this.chr);
        const overtimeTotal = this.overtime * ( hourly * this.co);
        const vacationTotal = this.vacation * (hourly * this.cv);
        const sickLeaveTotal = this.sickLeave * ( hourly * this.csl);
        const sl42t = this.sickLeave42 * ( hourly * 0.70);
        const sickLeave42Total = sl42t > 4257.28 ? 4257.28 : sl42t;
        const sickLeave80Total = this.sickLeave80 * ( hourly * 0.80);
        const sickLeave100Total = this.sickLeave100 * hourly;
        const holidayTotal = this.holiday * (hourly * this.ch);
        const nightShiftTotal = this.nightShift * (hourly * this.cn);
        const standbyTotal = this.standby * ( hourly * this.csb);

        this.brutto = this.brutto + regularHoursTotal + overtimeTotal + vacationTotal + sickLeaveTotal + sickLeave42Total + sickLeave80Total + sickLeave100Total + holidayTotal + nightShiftTotal + standbyTotal;

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

        let payout = (parseInt(netto) + parseInt(this.reimbursement)) - this.stoppage;

        const result = {
            brutto: this.brutto,
            hourly,
            regularHoursTotal,
            surtaxPercentage,
            overtimeTotal,
            vacationTotal,
            sickLeaveTotal,
            sickLeave42Total,
            sickLeave80Total,
            sickLeave100Total,
            holidayTotal,
            nightShiftTotal,
            standbyTotal,
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
            netto,
            payout
        }
        
        return result;


    }

    salary.brutto2ToBrutto = function (brutto2) {
        this.brutto2 = brutto2;

        brutto = this.brutto2 / 1.165; 

        return brutto;

    }

    salary.brutto2ToNetto = function (brutto2, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") {
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

    salary.brutto2ToNettoDetailed = function (brutto2, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") {
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

    salary.nettoToBrutto = function ( netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") {
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

    salary.nettoToBruttoDetailed = function (netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") {
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