const mathQuestion = document.querySelector('#math-question');
const mathAnswer = document.querySelector('#math-answer');
const mathCheck = document.querySelector('#math-check');
const mathFeedback = document.querySelector('#math-feedback');
const mathScore = document.querySelector('#math-score');

const englishClue = document.querySelector('#english-clue');
const englishChoices = document.querySelector('#english-choices');
const englishFeedback = document.querySelector('#english-feedback');
const englishScore = document.querySelector('#english-score');

const zuluWord = document.querySelector('#zulu-word');
const zuluChoices = document.querySelector('#zulu-choices');
const zuluFeedback = document.querySelector('#zulu-feedback');
const zuluScore = document.querySelector('#zulu-score');

const typingPrompt = document.querySelector('#typing-prompt');
const typingInput = document.querySelector('#typing-input');
const typingCheck = document.querySelector('#typing-check');
const typingNext = document.querySelector('#typing-next');
const typingFeedback = document.querySelector('#typing-feedback');
const typingScore = document.querySelector('#typing-score');

let currentMathAnswer = 0;
let currentEnglish = null;
let currentZulu = null;
let currentTyping = '';

const scores = {
  math: 0,
  english: 0,
  zulu: 0,
  typing: 0,
};

const englishQuestions = [
  { clue: '🐈 This pet says meow.', answer: 'cat', choices: ['cat', 'sun', 'book'] },
  { clue: '☀️ It shines in the sky during the day.', answer: 'sun', choices: ['moon', 'sun', 'fish'] },
  { clue: '📖 You read pages in a...', answer: 'book', choices: ['book', 'ball', 'tree'] },
  { clue: '🍎 A crunchy red fruit.', answer: 'apple', choices: ['apple', 'chair', 'star'] },
];

const zuluQuestions = [
  { word: 'sawubona', answer: 'hello', choices: ['hello', 'water', 'school'] },
  { word: 'ngiyabonga', answer: 'thank you', choices: ['friend', 'thank you', 'sun'] },
  { word: 'amanzi', answer: 'water', choices: ['water', 'book', 'dog'] },
  { word: 'isikole', answer: 'school', choices: ['school', 'apple', 'home'] },
];

const typingSentences = [
  'Anami can learn something new today.',
  'I type slowly and carefully.',
  'Math, English and Zulu are fun.',
  'Practice helps my fingers remember.',
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setFeedback(element, message, isCorrect) {
  element.textContent = message;
  element.classList.toggle('correct', isCorrect);
  element.classList.toggle('incorrect', !isCorrect);
}

function renderChoiceButtons(container, choices, onChoose) {
  container.replaceChildren();

  choices.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = choice;
    button.addEventListener('click', () => onChoose(choice));
    container.append(button);
  });
}

function newMathQuestion() {
  const firstNumber = Math.floor(Math.random() * 10) + 1;
  const secondNumber = Math.floor(Math.random() * 10) + 1;
  currentMathAnswer = firstNumber + secondNumber;
  mathQuestion.textContent = `${firstNumber} + ${secondNumber} = ?`;
  mathAnswer.value = '';
  mathAnswer.focus();
}

function checkMathAnswer() {
  const guess = Number(mathAnswer.value);

  if (guess === currentMathAnswer) {
    scores.math += 1;
    mathScore.textContent = scores.math;
    setFeedback(mathFeedback, 'Great job! Here is another one.', true);
    newMathQuestion();
    return;
  }

  setFeedback(mathFeedback, 'Try again. Count carefully!', false);
}

function newEnglishQuestion() {
  currentEnglish = randomItem(englishQuestions);
  englishClue.textContent = currentEnglish.clue;
  setFeedback(englishFeedback, '', true);
  renderChoiceButtons(englishChoices, currentEnglish.choices, (choice) => {
    if (choice === currentEnglish.answer) {
      scores.english += 1;
      englishScore.textContent = scores.english;
      setFeedback(englishFeedback, 'Correct! You matched the word.', true);
      newEnglishQuestion();
      return;
    }

    setFeedback(englishFeedback, 'Not quite. Look at the clue and try again.', false);
  });
}

function newZuluQuestion() {
  currentZulu = randomItem(zuluQuestions);
  zuluWord.textContent = currentZulu.word;
  setFeedback(zuluFeedback, '', true);
  renderChoiceButtons(zuluChoices, currentZulu.choices, (choice) => {
    if (choice === currentZulu.answer) {
      scores.zulu += 1;
      zuluScore.textContent = scores.zulu;
      setFeedback(zuluFeedback, 'Yebo! That is right.', true);
      newZuluQuestion();
      return;
    }

    setFeedback(zuluFeedback, 'Try again. You can do it!', false);
  });
}

function newTypingSentence() {
  currentTyping = randomItem(typingSentences);
  typingPrompt.textContent = currentTyping;
  typingInput.value = '';
  setFeedback(typingFeedback, '', true);
  typingInput.focus();
}

function checkTyping() {
  if (typingInput.value.trim() === currentTyping) {
    scores.typing += 1;
    typingScore.textContent = scores.typing;
    setFeedback(typingFeedback, 'Perfect typing! Try a new sentence.', true);
    return;
  }

  setFeedback(typingFeedback, 'Almost there. Check spaces, capitals and full stops.', false);
}

mathCheck.addEventListener('click', checkMathAnswer);
mathAnswer.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkMathAnswer();
  }
});
typingCheck.addEventListener('click', checkTyping);
typingNext.addEventListener('click', newTypingSentence);

newMathQuestion();
newEnglishQuestion();
newZuluQuestion();
newTypingSentence();
