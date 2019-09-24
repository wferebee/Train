//---------------------------------------------------------------------
var config = {
    apiKey: "AIzaSyCJIWYCh6Vo5q40vtTnzziV2uFJQDN6xHg",
    authDomain: "trains-289ff.firebaseapp.com",
    databaseURL: "https://trains-289ff.firebaseio.com",
    projectId: "trains-289ff",
    storageBucket: "",
    messagingSenderId: "819247385667",
    appId: "1:819247385667:web:8a4900fc0cc5d9f3d958f6",
    measurementId: "G-K540LC5NLZ"
};
//---------------------------------------------------------------------

firebase.initializeApp(config);
var database = firebase.database();
//---------------------------------------------------------------------

var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";
//---------------------------------------------------------------------

$("#addtrains").on("click", function(event){
	event.preventDefault(); 
	
	trainName = $("#train-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTime = $("#firstTrain-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	$("#train-input").val("");
	$("#destination-input").val("");
	$("#firstTrain-input").val("");
	$("#frequency-input").val("");
    //---------------------------------------------------------------------

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency
	});
});


database.ref().on("child_added", function(childSnapshot) {
    
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination
    firstTime = childSnapshot.val().firstTime;
    frequency = childSnapshot.val().frequency;

    var firstTimeMoment = moment(firstTime, "HH:mm");
    var currentTime = moment();
    var minuteArrival = currentTime.diff(firstTimeMoment, 'minutes');
    var minuteLast = minuteArrival % frequency;
    var awayTrain = frequency - minuteLast;
    var nextArrival = currentTime.add(awayTrain, 'minutes');
    var arrivaltime = nextArrival.format("HH:mm");
//---------------------------------------------------------------------
    $("#AddTrain").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");


    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});