const quizData = [
    { question: "Qual é a cor do céu?", options: ["Azul", "Verde", "Amarelo", "Roxo"], correct: "Azul" },
    { question: "2 + 2 é igual a?", options: ["3", "4", "5", "6"], correct: "4" },
    // Adicione mais perguntas...
  ];
  
  const quiz = document.getElementById('quiz');
  const submitButton = document.getElementById('submit');
  const result = document.getElementById('result');
  
  let userAnswers = [];
  
  function loadQuiz() {
    quiz.innerHTML = quizData.map((q, index) => `
      <div class="question">
        <h3>${index + 1}. ${q.question}</h3>
        ${q.options.map(option => `
          <label>
            <input type="radio" name="question-${index}" value="${option}">
            ${option}
          </label>
        `).join('')}
      </div>
    `).join('');
  }
  
  submitButton.addEventListener('click', () => {
    const answers = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);
  
    if (answers.length < quizData.length) {
      alert("Responda todas as perguntas!");
      return;
    }
  
    const isCorrect = answers.every((answer, index) => answer === quizData[index].correct);
  
    if (isCorrect) {
      result.classList.remove('hidden');
      quiz.classList.add('hidden');
      submitButton.classList.add('hidden');
    } else {
      alert("Alguma resposta está incorreta. Tente novamente!");
    }
  });
  
  loadQuiz();
  