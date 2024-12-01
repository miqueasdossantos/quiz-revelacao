const quizData = [
  {
    question: "Em que ano o casal se conheceu?",
    options: ["2014", "2016", "2018", "2020"],
    correct: "2014"
  },
  {
    question: "Qual é o prato favorito do casal?",
    options: ["Pizza", "Sushi", "Churrasco", "Macarrão"],
    correct: "Pizza"
  },
  {
    question: "Qual o hobby que o casal gosta de fazer juntos?",
    options: ["Cozinhar", "Assistir séries", "Viajar", "Ir à academia"],
    correct: "Viajar"
  },
   {
    question: "Qual é o doce favorito da mãe?",
    options: ["Chocolate", "Brownie", "Sorvete", "Doce de Leite"],
    correct: "Doce de Leite"
  },
  {
    question: "Quantos semanas de gestação tem o bebe?",
    options: ["5", "11", "13", "15"],
    correct: "11"
  },
  {
    question: "Qual o mês de nascimento do pai?",
    options: ["Janeiro", "Fevereiro", "Julho", "Setembro"],
    correct: "Fevereiro"
  },
  {
    question: "Qual a cor favorita da mãe?",
    options: ["Lilás", "Rosa", "Verde", "Bege"],
    correct: "Bege"
  },
    {
    question: "Onde o casal passou a lua de mel?",
    options: ["Bariloche", "Gramado", "Maragogi", "Natal"],
    correct: "Gramado"
  },
   {
    question: "Qual foi o primeiro desejo da mãe?",
    options: ["Pizza", "Parmegiana", "Pipoca", "Churros"],
    correct: "Pipoca"
  },
  {
    question: "Qual foi a reação do pai ao saber da gravidez?",
    options: ["Chorou de emoção", "Ficou em choque", "Jogou o boné e a sandalia", "Saiu correndo"],
    correct: "Jogou o boné e a sandalia"
  },
  {
    question: "Em que ano o casal se casou?",
    options: ["2019", "2020", "2021", "2022"],
    correct: "2021"
  },
   {
    question: "Quando foi descoberto que o bebê estava a caminho?",
    options: ["Agosto", "Setembro", "Outubro", "Novembro"],
    correct: "Outubro"
  },
  {
    question: "Como casal se conheceu?",
    options: ["Faculdade", "Trabalho", "Amigos em Comum", "Redes Sociais"],
    correct: "Amigos em Comum"
  },
   {
    question: "Qual foi o primeiro presente dado ao bebê pelo casal?",
    options: ["Roupinha", "Um bichinho de pelúcia", "Berço", "Livros infantis"],
    correct: "Roupinha"
  },
   {
    question: "Qual os nomes escolhidos pelo casal para o bebe?",
    options: ["Cleiton e Glaucia", "Cosmo e Velma", "Davi e Marina", "Ana Raio e Zé trovão"],
    correct: "Davi e Marina"
  },

  
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const finalMessage = document.getElementById("final-message");
const revealLink = document.getElementById("reveal-link");

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

  const options = document.querySelectorAll('input[name="answer"]');
  options.forEach((option) =>
    option.addEventListener("change", () => {
      nextButton.disabled = false;
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
    revealLink.classList.remove("hidden");
  } else {
    finalMessage.textContent = `Infelizmente, você acertou ${correctAnswers} de ${quizData.length} (${score.toFixed(0)}%). Tente novamente!`;
  }
}

nextButton.addEventListener("click", checkAnswer);

loadQuestion();
