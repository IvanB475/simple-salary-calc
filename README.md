# simple-salary-calc

Simple-salary-calc is a simple module which enables easier calculation of salaries in Croatia. 

It's installable via npm using ``` npm i simple-salary-calc ```.



Calculator provides several methods: 

**1. netto**  
- Simplest method that takes 4 parameters: brutto, children, supportedMembers and city and it returns single value, netto.
- children and supportedMembers default to 0 if you don't pass any value, city default to "zagreb".
```
netto = (brutto, children = 0, supportedMembers = 0, city = 'zagreb') => { ... }
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
            surtax,
            healthInsurance,
            brutto2,
            netto
}
```
- children and supportedMembers default to 0 if you don't pass any value, city default to "zagreb".

```
nettoDetailed = (brutto, children = 0, supportedMembers = 0, city = 'zagreb') => { ... }
```

**3. detailedListing**
- Method that takes 10 parameters: brutto, children, supportedMembers, city, hours, overtime, vacation, sickLeave, holiday, nightShift and returns object.
- Key/value pairs returned: 
```
{
            brutto,
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
```
- children, supportedMembers, overtime, vacation, sickLeave, holiday, nightShift default to 0, hours default to 160, city defaults to "zagreb".

```
detailedListing = (brutto, children = 0, supportedMembers = 0, city = 'zagreb', hours = 160, overtime = 0, vacation = 0, sickLeave = 0, holiday = 0, nightShift = 0) => { ... }
```

**4. brutto2ToBrutto**
- Method that takes single parameter, brutto2 and returns single value, brutto.

```
brutto2ToBrutto = (brutto2) => { ... }
```

**4. brutto2ToNetto**
- Method that takes 4 arguments: brutto2, children, supportedMembers and city and it returns single value, netto. 
- children and supportedMembers default to 0, city defaults to "zagreb".

```
brutto2ToNetto = (brutto2, children = 0, supportedMembers = 0, city = 'zagreb') => { ... }
```

## Basic usage example: 

```
const salaryCalc = require('simple-salary-calc');
// Parameters( brutto, children, supportedMembers, city) 
salaryCalc.netto(15000, 2, 1, "varazdin");
// Parameters( brutto, children, supportedMembers, city) 
salaryCalc.nettoDetailed(15000, 2, 1, "varazdin");
// Parameters( brutto, children, supportedMembers, city, hours, overtime, vacation, sickLeave, holiday, nightShift) 
salaryCalc.detailedListing(10000, 2, 1, "zagreb", 160, 40, 5, 8, 16, 20);
```
