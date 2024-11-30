const quizData = [
  { question: "Qual é a capital do Brasil?", options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"], correct: "Brasília" },
  { question: "Quantos meses tem um ano?", options: ["10", "12", "11", "13"], correct: "12" },
  { question: "Quanto é 5 x 5?", options: ["10", "15", "25", "30"], correct: "25" },
  { question: "Qual o maior planeta do Sistema Solar?", options: ["Marte", "Júpiter", "Saturno", "Terra"], correct: "Júpiter" },
  { question: "Quem pintou a Mona Lisa?", options: ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"], correct: "Leonardo da Vinci" },
  { question: "Qual é o oceano mais profundo?", options: ["Atlântico", "Pacífico", "Índico", "Ártico"], correct: "Pacífico" },
  { question: "Quantas cores tem o arco-íris?", options: ["6", "7", "8", "5"], correct: "7" },
  { question: "Quantos continentes existem?", options: ["5", "6", "7", "8"], correct: "7" },
  { question: "Em que país fica a Torre Eiffel?", options: ["Alemanha", "França", "Itália", "Inglaterra"], correct: "França" },
  { question: "Qual é o menor país do mundo?", options: ["Mônaco", "Vaticano", "Malta", "Liechtenstein"], correct: "Vaticano" },
  { question: "Quantos dias tem uma semana?", options: ["6", "7", "8", "9"], correct: "7" },
  { question: "Quanto é 10 dividido por 2?", options: ["2", "5", "10", "20"], correct: "5" },
  { question: "Qual é a fórmula química da água?", options: ["CO2", "O2", "H2O", "NaCl"], correct: "H2O" },
  { question: "Em que continente está o Brasil?", options: ["Ásia", "Europa", "América do Sul", "África"], correct: "América do Sul" },
  { question: "Qual é o maior animal terrestre?", options: ["Elefante", "Girafa", "Hipopótamo", "Rinoceronte"], correct: "Elefante" },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const finalMessage = document.getElementById("final-message");

// Função para carregar a pergunta atual
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
  nextButton.disabled = true; // Desativa o botão inicialmente

  // Seleciona todas as opções e adiciona o evento para habilitar o botão ao selecionar
  const options = document.querySelectorAll('input[name="answer"]');
  options.forEach((option) =>
    option.addEventListener("change", () => {
      nextButton.disabled = false; // Habilita o botão quando uma resposta é selecionada
    })
  );
}

// Função para verificar a resposta
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

// Função para mostrar o resultado final
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

// Carrega a primeira pergunta ao iniciar
loadQuestion();
