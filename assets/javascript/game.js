var winCount = 0;
var loseCount = 0;  
function StartGame (){    
  var movieTitle = [
    "ferris bueller",
    "waynes world",
    "star wars",
    "clueless",
    "the room",
    "harry potter"
  ];
  var randomNum = Math.floor(Math.random() * movieTitle.length); //random number generator
  var letterDiv = document.getElementById("letter_div"); 
  var guessDiv = document.getElementById("guess_div");
  var livesDiv = document.getElementById("lives_div");
  var winsDiv = document.getElementById("win_count");
  var loseDiv = document.getElementById("lose_count");  
  var letterDiv = document.getElementById("letter_div"); 
  var spaceStr = ""; //empty string for "_"
  var GuessConcat = []; //total guesses
  var answerChar = []; //stores letter characters of solution
  var RightGuess = []; //stores correct user inputs
  var WrongGuess = []; //stores incorrect user inputs
  var spaceArray = []; // stores chosenWord spaces
  var chosenWord = movieTitle[randomNum]; //randomly selected movie titlem
  var livesCount = 5;
  var win = false;
  var lettersLeft = chosenWord.length;
  console.log(chosenWord);
  console.log(letter_div);

  livesDiv.innerHTML = livesCount; //display lives onkeyup


  function GenerateMovie() {
    for (var i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === " ") {
        spaceStr = " ";
        spaceArray[i] = spaceStr;
      } else {
        spaceStr = "_";
        spaceArray[i] = spaceStr;
        answerChar.push(chosenWord[i]);
        console.log(spaceArray);
      }
    }
    letterDiv.innerHTML = spaceArray.join(""); //writes "_" to letter-div
    console.log("this is chosenword: " + chosenWord);
    console.log(answerChar);
    document.onkeydown = function(event) { //key event validation
      var userKey = event.keyCode;
      if (userKey > 64 && userKey < 91) { //if letter key
        console.log("you pressed: " + userKey);
        var userText = event.key.toLowerCase();
        console.log("userText: " + userText);
        if (livesCount > 0) { //if still alive
         if(win===false){
          var changed = false;
          if (GuessConcat.indexOf(userText) === -1) { //check for duplicate guesses
            for (var i = 0; i < chosenWord.length; i++) {
              if (userText === chosenWord[i]) {
                changed = true;
                spaceArray[i] = userText;
                lettersLeft--;
                letterDiv.innerHTML = spaceArray.join("");
                console.log("you guessed right! in forloop");
                console.log(lettersLeft);
              }
            }
            if (changed === true) {
              RightGuess.push(userText);
              console.log("right!!!" + RightGuess);
               if(lettersLeft<=1){ //win game 
                 win = true;
                 winCount++
                 winsDiv.innerHTML = "Wins: " + winCount;
                 guessDiv.innerHTML = "";
                 alert("you win! the word is: " + chosenWord);
                 StartGame();
               }
            } else {
              livesCount--;
              WrongGuess.push(userText);
              guessDiv.innerHTML = WrongGuess.join(" ,");
              livesDiv.innerHTML = livesCount;
              console.log("wrong");
              console.log("changed in else: " + changed);
              if(livesCount < 1) { 
                alert("YOU DIED NOOOOOOOOO!!!!!");
                loseCount++;
                loseDiv.innerHTML = "Losses: " + loseCount;
                guessDiv.innerHTML = "";
                StartGame();
              }
            }

            GuessConcat = RightGuess.concat(WrongGuess); //concat guess arrays
          } else {
            alert("you already guessed that!");
          }
        
        } 
        } 
      } else {
        alert("Invalid key, please try again!");
      }


      console.log(livesCount);
      console.log(changed);
    };
  }

  GenerateMovie();
  console.log("outside func" + spaceStr);
};

StartGame();
