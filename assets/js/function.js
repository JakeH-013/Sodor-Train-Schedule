//assumptions
var aFrequency = 10;
//first departure
var firstTime = "7:30";
//first departure converted
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);
//current time
var currentTime = moment();
console.log(moment(currentTime).format("hh:mm"));
//difference between times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log(diffTime);
//time between the train and now
var aDifference = diffTime % aFrequency;
console.log(aDifference);
//time until next train
var aMinTilTrain = aFrequency - aDifference;
console.log(aMinTilTrain);
//time when next train arrives
var nextTrain = moment().add(aMinTilTrain, "minutes");
console.log(moment(nextTrain).format("hh:mm"));