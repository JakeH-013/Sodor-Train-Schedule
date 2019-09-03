//assumptions
var aFrequency = 10;

var firstTime = "7:30";

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);