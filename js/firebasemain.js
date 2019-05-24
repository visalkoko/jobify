var config = {
      apiKey: "AIzaSyBq1UYGKU-cGnKtNrXB878lhsszP7HBujw",
      authDomain: "jobify-716ad.firebaseapp.com",
      databaseURL: "https://jobify-716ad.firebaseio.com",
      projectId: "jobify-716ad",
      storageBucket: "jobify-716ad.appspot.com",
      messagingSenderId: "926620190146"
};
firebase.initializeApp(config)


// Reference message collection

var messagesRef = firebase.database().ref('messages');

// validate the email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate(email) {
  var $result = $(".subscribe-message");
  $result.text("");

  if (validateEmail(email)) {
    saveMessage(email);
    $result.text("Thank for subscribing to our newsletter 💖");
    setTimeout(function() {
      $result.text("");}, 2000);
  } else {
    $result.text("❌ Please enter a valid email address!");
    setTimeout(function() {
      $result.text("");}, 2000);
  }
  return false;
}

// for firestore only ***********

// function email_collection(email){
// 		var db = firebase.firestore();
//
// 		db.collection("email_collection").add({
// 			email: email,
// 			datetime: new Date()
// 		})
// 		.then(function(docRef) {
// 			console.log("Successfully subscribe to SomJot newsletter!");
// 		})
// 		.catch(function(error) {
// 			console.error("Error adding document: ", error);
// 		});
// 	}


// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);
document.getElementById('contactFormSub').addEventListener('submit', submitFormSub);

// submit form Sub
function submitFormSub(e){
  e.preventDefault();
  console.log(123);

  // Get values FormSub
var name = getInputVal('name');
var company = getInputVal('company');
var emailsub = getInputVal('emailsub');
var phone = getInputVal('phone');
var message = getInputVal('message');

  saveMessageForm(name, company, emailsub, phone, message);

  // Show alert
  document.querySelector('.alertSub').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alertSub').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactFormSub').reset();
}


//submit form
function submitForm(e){
  e.preventDefault();
  console.log(123);
  //Get Values
  var email = getInputVal('email');
  console.log(email);

  //save message
  validate(email);


}
// func to get get form function
function getInputVal(id){
  return document.getElementById(id).value;
}

// save message to firebase
function saveMessage(email){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    email: email
  });
}

// Save message form
function saveMessageForm(name, company, emailsub, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
  name: name,
  company:company,
  emailsub:emailsub,
  phone:phone,
  message:message
  });
}
