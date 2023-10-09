const questions = [
  {
    question: 'Which is the larget animal in the world?',
    answers: [
      { text: 'Shart', correct: false},
      { text: 'Blue whale', correct: true},
      { text: 'Elephant', correct: false},
      { text: 'Giraffe', correct: false},
    ]
  },
  {
   question: 'Which is the smallest animal in the world?',
    answers: [
      { text: 'Vatican', correct: true},
      { text: 'Bhutan', correct: false},
      { text: 'Nepal', correct: false},
      { text: 'Shri Lanka', correct: false},
    ] 
  },
  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false},
      { text: 'Gobi', correct: false},
      { text: 'Sahara', correct: false},
      { text: 'Antarctica', correct: true},
    ] 
  },
  {
    question: 'Which is the smallest continent in the world?',
    answers: [
      { text: 'Asia', correct: false},
      { text: 'Australia', correct: true},
      { text: 'Arctic', correct: false},
      { text: 'Africa', correct: false},
    ] 
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0; //variable to store the question index
let score = 0; //variable to store the score

function startQuiz() {
  currentQuestionIndex = 0; //reset the currentQuestionIndex 0 when we start quiz
  score = 0; //reset the score 0 when we start quiz
  nextButton.innerHTML = 'Next'; //when start the Quiz again, the button should be Next.
  showQuestion(); // calling function
}

    //showQuestion function will display the questions and answers
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1; //if the index is 0 question should be 1.. 
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question; //question number and question

      //display answer from the current question set
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button"); //create button tag
    button.innerHTML = answer.text; //adding the answer text in the button tag
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    } //this will add the true or false in this data set correct
    button.addEventListener("click", selectAnswer);//click event for the answers button
  });
}

function resetState() {
  nextButton.style.display = "none";//This will hide the Next button
  while(answerButtons.firstChild) { 
    answerButtons.removeChild(answerButtons.firstChild);
  }//This will remove the first child in the answerButtons
}

    //select Answer function
function selectAnswer(e) {
  const selectedBtn = e.target;//This will add the selected button element when clicked on the button
  const isCorrect = selectedBtn.dataset.correct === "true";//This will check if the selected button data set is true
  if(isCorrect) {
    selectedBtn.classList.add("correct");//add the class name "correct" if the data set is true
    score++;//This will increase the score by 1
  }else {
    selectedBtn.classList.add("incorrect");//add the class name "incorrect" if the data set is false
  }

      //array from for the answer button children
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }//This will check the data set if is true then it will add the class name "correct" and also if selected the wrong answer, it will check the other answers if it's true then add the class name "correct"
    button.disabled = true;//disable button after selecting
  });
  nextButton.style.display = "block";//display Next button to go to the next question
}

    //score function
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;//display score out of the length of the question
  nextButton.innerHTML = "Play Again";//replace next button with "play again"
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;//increase the question index by 1 when clicked on Next button
  if(currentQuestionIndex < questions.length) {//this will check if the current index is less than the length of the question
    showQuestion();//display another question
  }else {
    showScore();//display score if there is no other question
  }
}
    //function for the Next button
nextButton.addEventListener("click", () => {
  if(currentQuestionIndex < questions.length) {//this will check if the current index is less than the length of the question
    handleNextButton();//next question
  }else {
    startQuiz();//this will restart quiz if there is no question
  }
});

startQuiz();//calling function