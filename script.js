const mathQuestion = document.querySelector('#math-question');
const mathAnswer = document.querySelector('#math-answer');
const mathCheck = document.querySelector('#math-check');
const mathFeedback = document.querySelector('#math-feedback');
const mathScore = document.querySelector('#math-score');
const mathLevel = document.querySelector('#math-level');

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

const wordBank = [
  { english: 'cat', zulu: 'ikati', clue: '🐈 A small pet that says meow.' },
  { english: 'dog', zulu: 'inja', clue: '🐕 A friendly pet that barks.' },
  { english: 'sun', zulu: 'ilanga', clue: '☀️ It shines in the sky during the day.' },
  { english: 'moon', zulu: 'inyanga', clue: '🌙 It shines at night.' },
  { english: 'star', zulu: 'inkanyezi', clue: '⭐ A tiny bright light in the night sky.' },
  { english: 'book', zulu: 'incwadi', clue: '📖 You read pages in this.' },
  { english: 'school', zulu: 'isikole', clue: '🏫 A place where children learn.' },
  { english: 'teacher', zulu: 'uthisha', clue: '👩‍🏫 A person who helps learners understand.' },
  { english: 'learner', zulu: 'umfundi', clue: '🎒 A child or person who studies.' },
  { english: 'pencil', zulu: 'ipensela', clue: '✏️ You write or draw with this.' },
  { english: 'paper', zulu: 'iphepha', clue: '📄 A thin sheet you can write on.' },
  { english: 'chair', zulu: 'isihlalo', clue: '🪑 You sit on this.' },
  { english: 'table', zulu: 'itafula', clue: 'A flat piece of furniture for work or meals.' },
  { english: 'door', zulu: 'umnyango', clue: '🚪 You open this to enter a room.' },
  { english: 'window', zulu: 'iwindi', clue: '🪟 You look outside through this.' },
  { english: 'house', zulu: 'indlu', clue: '🏠 A place where people live.' },
  { english: 'water', zulu: 'amanzi', clue: '💧 You drink this when thirsty.' },
  { english: 'milk', zulu: 'ubisi', clue: '🥛 A white drink from cows.' },
  { english: 'bread', zulu: 'isinkwa', clue: '🍞 Food used to make toast or sandwiches.' },
  { english: 'apple', zulu: 'ihhabhula', clue: '🍎 A crunchy red or green fruit.' },
  { english: 'banana', zulu: 'ubhanana', clue: '🍌 A long yellow fruit.' },
  { english: 'car', zulu: 'imoto', clue: '🚗 A vehicle that drives on roads.' },
  { english: 'bus', zulu: 'ibhasi', clue: '🚌 A big vehicle that carries many people.' },
  { english: 'road', zulu: 'umgwaqo', clue: '🛣️ Cars and buses travel on this.' },
  { english: 'tree', zulu: 'isihlahla', clue: '🌳 A tall plant with branches and leaves.' },
  { english: 'flower', zulu: 'imbali', clue: '🌸 A colourful plant that can smell sweet.' },
  { english: 'grass', zulu: 'utshani', clue: 'Green plants that cover the ground.' },
  { english: 'bird', zulu: 'inyoni', clue: '🐦 An animal with wings and feathers.' },
  { english: 'fish', zulu: 'inhlanzi', clue: '🐟 An animal that swims in water.' },
  { english: 'cow', zulu: 'inkomo', clue: '🐄 A farm animal that gives milk.' },
  { english: 'goat', zulu: 'imbuzi', clue: '🐐 A farm animal with horns that can climb well.' },
  { english: 'hand', zulu: 'isandla', clue: '✋ You use this to hold things.' },
  { english: 'foot', zulu: 'unyawo', clue: '🦶 You stand and walk on this.' },
  { english: 'eye', zulu: 'iso', clue: '👁️ You use this to see.' },
  { english: 'ear', zulu: 'indlebe', clue: '👂 You use this to hear.' },
  { english: 'mouth', zulu: 'umlomo', clue: '👄 You use this to speak and eat.' },
  { english: 'head', zulu: 'ikhanda', clue: '🙂 The body part above your neck.' },
  { english: 'mother', zulu: 'umama', clue: 'A female parent.' },
  { english: 'father', zulu: 'ubaba', clue: 'A male parent.' },
  { english: 'friend', zulu: 'umngane', clue: 'A person you like and play with.' },
  { english: 'family', zulu: 'umndeni', clue: 'People who belong together at home.' },
  { english: 'hello', zulu: 'sawubona', clue: '👋 A greeting you say when you meet someone.' },
  { english: 'thank you', zulu: 'ngiyabonga', clue: '🙏 Words you say when someone helps you.' },
  { english: 'yes', zulu: 'yebo', clue: 'A word that means you agree.' },
  { english: 'no', zulu: 'cha', clue: 'A word that means you do not agree.' },
  { english: 'red', zulu: 'bomvu', clue: '🔴 The colour of a stop sign.' },
  { english: 'blue', zulu: 'luhlaza okwesibhakabhaka', clue: '🔵 The colour of a clear sky.' },
  { english: 'green', zulu: 'luhlaza', clue: '🟢 The colour of healthy grass.' },
  { english: 'one', zulu: 'kunye', clue: '1️⃣ The number after zero.' },
  { english: 'two', zulu: 'kubili', clue: '2️⃣ One plus one.' },
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

function getMathLevel() {
  return Math.min(5, Math.floor(scores.math / 5) + 1);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMathSettings(level) {
  const settings = [
    { max: 10, operations: ['+', '-'] },
    { max: 20, operations: ['+', '-', '×'] },
    { max: 50, operations: ['+', '-', '×', '÷'] },
    { max: 100, operations: ['+', '-', '×', '÷'] },
    { max: 144, operations: ['+', '-', '×', '÷'] },
  ];

  return settings[level - 1];
}

function createDivisionQuestion(level) {
  const divisor = randomNumber(2, Math.min(12, level + 5));
  const answer = randomNumber(2, Math.min(12, level + 6));
  return {
    firstNumber: divisor * answer,
    secondNumber: divisor,
    answer,
    symbol: '÷',
  };
}

function createMathQuestion(level) {
  const settings = getMathSettings(level);
  const symbol = randomItem(settings.operations);

  if (symbol === '÷') {
    return createDivisionQuestion(level);
  }

  if (symbol === '×') {
    const maxFactor = Math.min(12, level + 5);
    const firstNumber = randomNumber(2, maxFactor);
    const secondNumber = randomNumber(2, maxFactor);
    return {
      firstNumber,
      secondNumber,
      answer: firstNumber * secondNumber,
      symbol,
    };
  }

  const firstNumber = randomNumber(1, settings.max);
  const secondNumber = randomNumber(1, settings.max);

  if (symbol === '-') {
    const biggerNumber = Math.max(firstNumber, secondNumber);
    const smallerNumber = Math.min(firstNumber, secondNumber);
    return {
      firstNumber: biggerNumber,
      secondNumber: smallerNumber,
      answer: biggerNumber - smallerNumber,
      symbol,
    };
  }

  return {
    firstNumber,
    secondNumber,
    answer: firstNumber + secondNumber,
    symbol,
  };
}

function newMathQuestion() {
  const level = getMathLevel();
  const question = createMathQuestion(level);
  currentMathAnswer = question.answer;
  mathLevel.textContent = level;
  mathQuestion.textContent = `${question.firstNumber} ${question.symbol} ${question.secondNumber} = ?`;
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

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getChoiceCount(score) {
  if (score >= 20) {
    return 6;
  }

  if (score >= 10) {
    return 5;
  }

  if (score >= 5) {
    return 4;
  }

  return 3;
}

function makeChoices(correctAnswer, allAnswers, score) {
  const choiceCount = getChoiceCount(score);
  const distractors = shuffleItems(allAnswers.filter((answer) => answer !== correctAnswer));
  return shuffleItems([correctAnswer, ...distractors.slice(0, choiceCount - 1)]);
}

function newEnglishQuestion() {
  currentEnglish = randomItem(wordBank);
  englishClue.textContent = currentEnglish.clue;
  setFeedback(englishFeedback, '', true);
  renderChoiceButtons(
    englishChoices,
    makeChoices(currentEnglish.english, wordBank.map((word) => word.english), scores.english),
    (choice) => {
      if (choice === currentEnglish.english) {
        scores.english += 1;
        englishScore.textContent = scores.english;
        setFeedback(englishFeedback, 'Correct! You matched the word.', true);
        newEnglishQuestion();
        return;
      }

      setFeedback(englishFeedback, 'Not quite. Look at the clue and try again.', false);
    }
  );
}

function newZuluQuestion() {
  currentZulu = randomItem(wordBank);
  zuluWord.textContent = currentZulu.zulu;
  setFeedback(zuluFeedback, '', true);
  renderChoiceButtons(
    zuluChoices,
    makeChoices(currentZulu.english, wordBank.map((word) => word.english), scores.zulu),
    (choice) => {
      if (choice === currentZulu.english) {
        scores.zulu += 1;
        zuluScore.textContent = scores.zulu;
        setFeedback(zuluFeedback, 'Yebo! That is right.', true);
        newZuluQuestion();
        return;
      }

      setFeedback(zuluFeedback, 'Try again. You can do it!', false);
    }
  );
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
