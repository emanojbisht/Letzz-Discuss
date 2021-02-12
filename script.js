var questions = {
    questionAsked : "",
    questionDescription : "",
    collectResponse : []
}
var responseOfQuestion = {
    name : "",
    responseDescription : ""
}

var tempDivId;
var submitButton = document.getElementById("submit");
var questionDisplayDiv = document.getElementById("leftDiv");
var askQuestions = document.getElementById("askQuestions");
var resolve = document.getElementById("resolve");
var responseSubmit = document.getElementById("responseSubmit");
var responseTitle = document.getElementById("responseTitle");
var searchQuestion = document.getElementById("searchQuestion");


function showResponseList(p){
    var insertCollected = JSON.parse(localStorage.getItem(p));
    while (responseTitle.firstChild) {
        responseTitle.removeChild(responseTitle.firstChild);
    }
    for(var i = 0;i < insertCollected.collectResponse.length;i++){
        var itemCollected = insertCollected.collectResponse[i];
        var rDiv = document.createElement("div");
        rDiv.style.border = "2px solid black";
        rDiv.style.fontStyle = "bold";
        responseTitle.appendChild(rDiv);
        var rName = document.createElement("LABEL");
        rName.style.fontSize = "20px";
        rName.style.color = "#ff0058";
        rName.innerHTML = itemCollected.name.toUpperCase()+"<br>";
        rDiv.appendChild(rName);
        var rDis = document.createElement("LABEL");
        rDis.style.fontSize = "15px";
        rDis.innerHTML = itemCollected.responseDescription+"<br>";
        rDis.style.color = "black";
        rName.appendChild(rDis);
    }
}


function discuss(collectedQuestionId){
    tempId = collectedQuestionId;
    rightDiv.style.visibility = "hidden";
    rightDiv1.style.visibility = "visible";
    var index = parseInt("divId"+collectedQuestionId);
    var insert = JSON.parse(localStorage.getItem(collectedQuestionId));
    var displayQuestion = document.getElementById("displayQuestion");
    var displayDiscription = document.getElementById("displayDiscription");
    displayQuestion.innerHTML = insert.questionAsked.toUpperCase();
    displayQuestion.style.color = "#c52f5c";
    displayQuestion.style.fontSize = "20px";
    displayDiscription.innerHTML = insert.questionDescription;
    showResponseList(collectedQuestionId);
}


//displaying question with JSOn-KEY
function displayQuestions(keyReceived){
    var insert = JSON.parse(localStorage.getItem(keyReceived));
    var displayQuestionsDiv = document.createElement("div");
    displayQuestionsDiv.id = ""+keyReceived;
    displayQuestionsDiv.onclick = function(){
        discuss(displayQuestionsDiv.id);
        tempDivId = displayQuestionsDiv.id;
    }
    displayQuestionsDiv.style.border = "2px solid ";
    displayQuestionsDiv.style.fontStyle = "bold";
    displayQuestionsDiv.style.borderBottom = "2px;";
    questionDisplayDiv.appendChild(displayQuestionsDiv);
    var SubjectDisplay = document.createElement("LABEL");
    SubjectDisplay.style.fontSize = "20px";
    SubjectDisplay.style.color = "white";
    SubjectDisplay.innerHTML = "-"+insert.questionAsked+"<br>";
    displayQuestionsDiv.appendChild(SubjectDisplay);
    var questionDisplay = document.createElement("LABEL");
    questionDisplay.style.fontSize = "15px";
   // questionDisplay.style.color = "black";
    questionDisplay.innerHTML = insert.questionDescription+"<br>";
    questionDisplay.style.wordBreak = "break-all";
    SubjectDisplay.appendChild(questionDisplay);
}

function DisplayingDataAtEntry(){
    var dataInLocalStore = localStorage.length;
    var value = Object.keys(localStorage);
    for(i = 0; i < value.length;i++){
        displayQuestions(value[i]);
    }
}

askQuestions.addEventListener("click",function(){
    rightDiv.style.visibility = "visible";
    rightDiv1.style.visibility = "hidden";
});

resolve.addEventListener("click",function(){
    localStorage.removeItem(""+tempDivId);
    var deleteElement = document.getElementById(tempDivId);
    deleteElement.remove();
    rightDiv.style.visibility = "visible";
    rightDiv1.style.visibility = "hidden";
});


responseSubmit.addEventListener("click",function(){
    responseOfQuestion.name = document.getElementById("responseName").value;
    responseOfQuestion.responseDescription = document.getElementById("ResponseDescription").value;
    if(responseOfQuestion.name !== "" && responseOfQuestion.responseDescription !== ""){
        document.getElementById("responseName").value = "";
        document.getElementById("ResponseDescription").value = "";
        var receivedDAta = JSON.parse(localStorage.getItem(tempDivId));
        receivedDAta.collectResponse.push(responseOfQuestion);
        localStorage.removeItem(""+tempDivId);
        localStorage.setItem(""+tempDivId, JSON.stringify(receivedDAta));
        showResponseList(tempDivId);
    }
});



searchQuestion.addEventListener("keyup",function(e){
    var enteredText = searchQuestion.value;
    var value = Object.keys(localStorage);
    for(i = 0; i < value.length;i++){
        var tempId = JSON.parse(localStorage.getItem(""+value[i]));
        if(tempId.questionAsked.indexOf(enteredText.toLowerCase()) > -1){
            searchvalue(""+value[i]);
        }
    }
    function searchvalue(keyid){
        while (questionDisplayDiv.firstChild) {
            questionDisplayDiv.removeChild(questionDisplayDiv.firstChild);
        }
        displayQuestions(keyid);
    }
    if(enteredText === ""){
        while (questionDisplayDiv.firstChild) {
            questionDisplayDiv.removeChild(questionDisplayDiv.firstChild);
        }
        DisplayingDataAtEntry();
    }

});


//user press submit button where the question is beng asked;
submitButton.addEventListener("click",function(){
    questions.questionAsked = document.getElementById("subject").value.toLowerCase();
    questions.questionDescription = document.getElementById("question").value;
    if(questions.questionAsked !== "" && questions.questionDescription !== ""){
        var length = localStorage.length;
        document.getElementById("subject").value = "";
        document.getElementById("question").value = "";
        localStorage.setItem("JSON"+length, JSON.stringify(questions));
        var JSONKey = "JSON"+length;
        displayQuestions(JSONKey);
    }
});

function start(){
    DisplayingDataAtEntry();
}
start();