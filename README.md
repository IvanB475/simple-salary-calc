# simple-salary-calc

Simple-salary-calc is a simple library which enables easier calculation of salaries in Croatia. 

Installable via npm using ``` npm i simple-salary-calc ```.



Calculator provides several methods: 

**1. netto**  
- Simplest method that takes 5 parameters: brutto, children, supportedMembers, surtaxPercentageDec, city and it returns single value, netto.
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".
```
netto = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') => { ... }
```

**2. nettoDetailed**
- Method that's identical to netto method, but it returns object with more detailed calculation breakdown.
- Key/value pairs returned:
```
{
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
```
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".

```
nettoDetailed = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') => { ... }
```

**3. detailedListing**
- Method that takes 20 parameters: brutto, children, supportedMembers, surtaxPercentageDec, city, hours, regularHours,  overtime, vacation, sickLeave, sickLeave42, sickLeave80, sickLeave100, holiday, nightShift, co, cv, csl, ch, cn and returns object.
- Key/value pairs returned: 
```
{
            brutto,
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
```
- children, supportedMembers, surtaxPercentageDec, regularHours, overtime, vacation, sickLeave, sickLeave42, sickLeave80, sickLeave100, holiday, nightShift default to 0, hours default to 160, city defaults to "zagreb", co default to 1.3, cv to 1, csl to 0.70, ch to 1, cn to 1.5.

```
detailedListing = (brutto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb', hours = 160, regularHours = 0, overtime = 0, vacation = 0, sickLeave = 0, sickLeave42 = 0, sickLeave80 = 0, sickLeave100 = 0, holiday = 0, nightShift = 0, co = 1.3, cv = 1, csl = 0.70, ch = 1, cn = 1.5) => { ... }
```

**4. brutto2ToBrutto**
- Method that takes single parameter, brutto2 and returns single value, brutto.

```
brutto2ToBrutto = (brutto2) => { ... }
```

**5. brutto2ToNetto**
- Method that takes 5 arguments: brutto2, children, supportedMembers, surtaxPercentageDec, city, and returns a single value, netto. 
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".

```
brutto2ToNetto = (brutto2, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = 'zagreb') => { ... }
```

**6. brutto2ToNettoDetailed**
- Method that takes 5 arguments: brutto2, children, supportedMembers, surtaxPercentageDec, city, and it returns an object.
- Key/value pairs returned:
```
{
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
            brutto2,
            netto
}
```
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".

```
brutto2ToNettoDetailed = (brutto2, children = 0, supportedMembers = 0, city = 'zagreb') => { ... }
```

**7. NettoToBrutto**
- Method that takes 5 arguments: netto, children, supportedMembers, surtaxPercentageDec, city and returns a  single value, brutto.
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".

```
nettoToBrutto = ( netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => { ... }
```


**8. NettoToBruttoDetailed**
- Method that takes 5 arguments: netto, children, supportedMembers, surtaxPercentageDec, city and returns an object.
- Key/value pairs returned:

```
{
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
```
- children, supportedMembers and surtaxPercentageDec default to 0, city defaults to "zagreb".


```
nettoToBruttoDetailed = ( netto, children = 0, supportedMembers = 0, surtaxPercentageDec = 0, city = "zagreb") => { ... }
```

## Basic usage example: 

```
const salaryCalc = require('simple-salary-calc');
// Parameters( brutto, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.netto(15000, 2, 1, 0.10, "varazdin");
// Parameters( brutto, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.nettoDetailed(15000, 2, 1, 0.10, "varazdin");
// Parameters( brutto, children, supportedMembers, surtaxPercentageDec, city, hours, regularHours, overtime, vacation, sickLeave, sickLeave42, sickLeave80, sickLeave100, holiday, nightShift) 
salaryCalc.detailedListing(10000, 2, 1, 0.18, "zagreb", 160, 120, 40, 5, 8, 0, 0, 0, 16, 20);
// Parameters( brutto2) 
salaryCalc.brutto2ToBrutto(15000);
// Parameters( brutto2, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.brutto2ToNetto(15000, 2, 1, 0.10, "varazdin");
// Parameters( brutto2, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.brutto2ToNettoDetailed(15000, 2, 1, 0.10, "varazdin");
// Parameters( netto, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.nettoToBrutto(15000, 2, 1, 0.10, "varazdin");
// Parameters( netto, children, supportedMembers, surtaxPercentageDec, city) 
salaryCalc.nettoToBruttoDetailed(15000, 2, 1, 0.10, "varazdin");

```
