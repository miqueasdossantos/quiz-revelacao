const quizData = [
  { question: "Qual é a capital do Brasil 12?", options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"], correct: "Brasília" },
  { question: "Quantos meses tem um ano?", options: ["10", "12", "11", "13"], correct: "12" },
  { question: "Quanto é 5 x 5?", options: ["10", "15", "25", "30"], correct: "25" },
  { question: "Qual o maior planeta do Sistema Solar?", options: ["Marte", "Júpiter", "Saturno", "Terra"], correct: "Júpiter" },
  { question: "Quem pintou a Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"], correct: "Leonardo da Vinci" },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const finalMessage = document.getElementById("final-message");

// Função para carregar a pergunta
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.innerHTML = `
    <h3>${currentQuestionIndex + 1}. ${currentQuestion.question}</h3>
    <div class="options">
      ${currentQuestion.options
        .map(
          (option, index) =>
            `<label>
              <input type="radio" name="answer" value="${option}" id="option${index}">
              ${option}
            </label>`
        )
        .join("")}
    </div>
  `;
  nextButton.disabled = true;

  // Adiciona evento para habilitar o botão quando uma opção for selecionada
  const options = document.querySelectorAll('input[name="answer"]');
  options.forEach((option) =>
    option.addEventListener("change", () => {
      nextButton.disabled = false; // Habilita o botão quando uma resposta é selecionada
    })
  );
}

// Verifica a resposta e avança para a próxima pergunta
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestionIndex].correct) {
      correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
}

// Mostra o resultado final
function showResult() {
  questionContainer.classList.add("hidden");
  nextButton.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const score = (correctAnswers / quizData.length) * 100;
  if (score >= 70) {
    finalMessage.textContent = `Parabéns! Você acertou ${correctAnswers} de ${quizData.length} (${score.toFixed(0)}%) e passou no quiz!`;
  } else {
    finalMessage.textContent = `Infelizmente, você acertou ${correctAnswers} de ${quizData.length} (${score.toFixed(0)}%). Tente novamente!`;
  }
}

// Eventos
nextButton.addEventListener("click", checkAnswer);

// Inicializa o quiz
loadQuestion();
