var gameOver = false;
var playing = false;
var images = [];
var matched = [];
var firstClick = true;
var firstCell = "";
var secondCell = "";
var timer = "";

function selected(cell) {
   if (gameOver)
	    return;
			
   if (!playing) {
	    alert("Select a playing level");
			return;
	 }
	 
	 if (timer != "") //  ignore click, timer is still running
	    return;
	
	 if (matched[parseInt(cell)]) // already matched and dispalyed
	    return;
	 
	 display(cell);
	 
	 if (firstClick)
		  firstCell = cell;
	 else { // second click
	    if (cell != firstCell) {
			   if(pair(cell, firstCell)) {
			   	  matchedThese(cell, firstCell);
						debug("you matched: " + cell + " and " + firstCell);
			   }
				 else {
			      secondCell = cell;
				    timer = setTimeout("hide()", 2000);
						document.getElementById("scoreSpan").innerHTML = parseInt(document.getElementById("scoreSpan").innerHTML) + 1;
			   }
		  }
			else {
				secondCell = cell;
				timer = setTimeout("hide()", 2000);
			}
	 }
	 firstClick = !firstClick;
}

function matchedThese(cell1, cell2) {
   matched[parseInt(cell1)] = matched[parseInt(cell2)] = true;
	 if (allCorrect()) {
	    gameOver = true;
			scoreIt();
			alert("game over - you WIN!");
	 }
}

function pair(cell1, cell2) {
   if (images[parseInt(cell1)] == images[parseInt(cell2)]) {
	    return true;
	 }
	 else
	    return false;
}

function display (cell) {
   document.getElementById("cell" + cell).src = "images/p" + images[parseInt(cell)] + "-120x80.jpg";
}

function hide() {
   document.getElementById("cell" + firstCell).src = "images/question.gif";
	 document.getElementById("cell" + secondCell).src = "images/question.gif";
	 timer = "";
}

function randomInt(low, high) {
   return Math.floor(Math.random() * (high-low+1) + low);
}

function shuffle(A, numItems) {
	 for (var i=0; i<numItems; i++) {
	    var newLoc = randomInt(0,numItems-1);
			var temp = images[newLoc];
			images[newLoc] = images[i];
			images[i] = temp;
	 }
}

function allCorrect() {
   for (var i=0; i<30; i++)
	   if (!matched[i])
		    return false;
	 return true;
}

/*
  assume pictures are in subfolder: images
	filenames are of the form: p#-120x80.jpg
	Images 00..031 are the standard set, 10..131 are distractors
	Easy mode: randomize an array from 0..29 and prepend a 0 to the first 15
	Hard mode: randomize an array from 0..29, select item 7 and the first 7 and use both 0# and 1#
*/
function startUp(level) {
   // unrandomized array
   for (var i=0; i<30; i++) {
	    images[i] = i;
			matched[i] = false;
	 }
	 shuffle(images, 30);
	 
	 if (level == 0) { // easy
	    // relicate the first 15, all with 0#
	 		for (var i=0; i<15; i++){
			   images[i] = images[i+15] = "0" + images[i];
			}
	 }
	 else if (level == 1) { //harder
	    for (var i=0; i<7; i++){
			   var temp = images[i];
			   images[i]= images[i+15] = "0" + temp;
				 images[i+7] = images[i+22] = "1" + temp;
			}
			images[14] = images[29] = "1" + images[14];
	 }
	 else { //hardest
	 		for (var i=0; i<15; i++)
			   images[i] = images[i+15] = "2" + i;
			 
	 }
	 shuffle(images, 30);
	 
	 for (var i=0; i<30; i++)
	 	 			document.getElementById("cell" + i).src = "images/question.gif";
	 
	 document.getElementById("instruct").style.display = "none";
	 document.getElementById("score").style.display = "block";
	 playing = true;
	 //dump();
}

function scoreIt(){
   var score = parseInt(document.getElementById("scoreSpan").innerHTML);
	 var msg = "";
	 if (score <= 3)
	     msg = "Skill <i>and</i> luck! A good combination.";
	 else if (score <= 6)
	     msg = "Excellent! You have a very good memory.";
	 else if (score <= 10)
	     msg = "Good job! You must not lose things often.";
	 else if (score <= 15)
	     msg = "Nice work! But you could practice more.";
	 else if (score <= 21)
	     msg = "Not too shabby, but I bet you lose your keys.";
	 else
	     msg = "You should play again... is you can remember to.";
	 document.getElementById("score").innerHTML = msg;
}

function dump(){
   var indx=0;
   for (var row=0; row<6; row++)
		for (var col=0; col<5; col++)
		   document.getElementById("debug").innerHTML += row + " " + col + " " + document.getElementById("cell" + indx++).src + "<br>";
}

function debug(msg) {
   //document.getElementById("debug").innerHTML = msg + "<br>" + document.getElementById("debug").innerHTML;
}

