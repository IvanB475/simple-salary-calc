exports.calcSurtaxPercentage = (city) => {
    this.city = city;
    let surtaxPercentage = 0;
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

    return surtaxPercentage;
}