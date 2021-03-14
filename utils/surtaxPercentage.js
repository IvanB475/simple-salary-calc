exports.calcSurtaxPercentage = function (city) {
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
        case "andrijasevci": 
            surtaxPercentage = 0.08;
            break;
        case "antunovac": 
            surtaxPercentage = 0.05;
            break;
        case "babina greda":
            surtaxPercentage = 0.05;
            break;
        case "bale":
            surtaxPercentage = 0.01;
            break;
        case "barban":
            surtaxPercentage = 0.05;
            break;
        case "bedenica": 
            surtaxPercentage = 0.03;
            break;
        case "bednja":
            surtaxPercentage = 0.10;
            break;
        case "beli manastir": 
            surtaxPercentage = 0.05;
            break;
        case "belica":
            surtaxPercentage = 0.01;
            break;
        case "belisce":
            surtaxPercentage = 0.10;
            break;
        case "benkovac": 
            surtaxPercentage = 0.05;
            break;
        case "beretinec": 
            surtaxPercentage = 0.07;
            break;
        case "bilice": 
            surtaxPercentage = 0.10;
            break;
        case "bilje":
            surtaxPercentage = 0.05;
            break;
        case "biograd na moru":
            surtaxPercentage = 0.12;
            break;
        case "biskupija":
            surtaxPercentage = 0.04;
            break;
        case "bistra":
            surtaxPercentage = 0.10;
            break;
        case "bizovac":
            surtaxPercentage = 0.03;
            break;
        case "bjelovar":
            surtaxPercentage = 0.12;
            break;
        case "blato":
            surtaxPercentage = 0.10;
            break;
        case "bol":
            surtaxPercentage = 0.10;
            break;
        case "borovo":
            surtaxPercentage = 0.10;
            break;
        case "bosnjaci":
            surtaxPercentage = 0.05;
            break;
        case "brckovaljni":
            surtaxPercentage = 0.03;
            break;
        case "brdovec": 
            surtaxPercentage = 0.10;
            break;
        case "brela":
            surtaxPercentage = 0.05;
            break;
        case "brestovac":
            surtaxPercentage = 0.05;
            break;
        case "breznica":
            surtaxPercentage = 0.10;
            break;
        case "breznički hum":
            surtaxPercentage = 0.03;
            break;
        case "brinje":
            surtaxPercentage = 0.10;
            break;
        case "brodski stupnik":
            surtaxPercentage = 0.10;
            break;
        case "buje":
            surtaxPercentage = 0.06;
            break;
        case "bukovlje":
            surtaxPercentage = 0.05;
            break;
        case "buzet":
            surtaxPercentage = 0.06;
            break;
        case "cabar":
            surtaxPercentage = 0.05;
            break;
        case "caglin":
            surtaxPercentage = 0.05;
            break;
        case "cakovec":
            surtaxPercentage = 0.10;
            break;
        case "cazma":
            surtaxPercentage = 0.10;
            break;
        case "ceminac":
            surtaxPercentage = 0.03;
            break;
        case "cepin":
            surtaxPercentage = 0.10;
            break;
        case "cerna":
            surtaxPercentage = 0.05;
            break;
        case "cernik":
            surtaxPercentage = 0.10;
            break;
        case "cerovlje":
            surtaxPercentage = 0.02;
            break;
        case "cestica":
            surtaxPercentage = 0.10;
            break;
        case "cista provo":
            surtaxPercentage = 0.03;
            break;
        case "civljane":
            surtaxPercentage = 0.05;
            break;
        case "cirkvenica":
            surtaxPercentage = 0.10;
            break;
        default:
            surtaxPercentage = 0.10;
            break;
    }

    return surtaxPercentage;
}