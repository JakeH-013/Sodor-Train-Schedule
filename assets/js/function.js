var firebaseConfig = {
    apiKey: "AIzaSyC6GDC8FOnBn1PU5JSrghl60D6OZbBMWd4",
    authDomain: "train-time-2e1bf.firebaseapp.com",
    databaseURL: "https://train-time-2e1bf.firebaseio.com",
    projectId: "train-time-2e1bf",
    storageBucket: "",
    messagingSenderId: "685306532538",
    appId: "1:685306532538:web:4ebdc096376cccb5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();

  //click event for button
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    //pull form inputs
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency-input").val().trim();

    //creates local temp storage for data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency
    };
    //uploads inputs to the database
    dataRef.ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.first);
    // console.log(newTrain.frequency);

    alert("New line added");

    // Clears text boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

  //firebase event for adding new trains to the html
  dataRef.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
    //store items in variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;
    //converts the first train time from unix to HH:mm
    var firstTrainNice = moment.unix(firstTrain).format("HH:mm");

    var firstTrainConvert = moment(firstTrainNice, "hh:mm A").subtract(1, "year");
    //gets the current time
    var currentTime = moment();
    //gets the difference between the current time and the first train time
    var diffTime = moment().diff(moment(firstTrainConvert), "minutes");
    //gets the time between the train and now
    var timeDifference = diffTime % trainFrequency;
    //takes that number and tells us how long until the coming train arrives
    var timeTilTrain = trainFrequency - timeDifference;
    //tells us when the next train will arrive
    var nextTrain = moment().add(timeTilTrain, "minutes");


    //adds new row to the table, which contains each piece of input/information
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(moment(nextTrain).format("hh:mm A")),
        $("<td>").text(timeTilTrain)
    );
    //appends the row
    $("#train-table > tbody").append(newRow);
  });



