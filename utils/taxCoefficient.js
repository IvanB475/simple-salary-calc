

exports.getTc = function (surtaxPercentage) {
     this.surtaxPercentage = surtaxPercentage;
    
     const tc = 1 + this.surtaxPercentage;

     return tc;

}