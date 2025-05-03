
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(questions);

const container = document.getElementById("quiz-container");

questions.forEach((q, idx) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p>${idx + 1}. ${q.question}</p>` + 
    q.options.map((opt, i) => `
      <label class="option">
        <input type="radio" name="q${idx}" value="${opt}" />
        ${opt}
      </label>
    `).join("");
  container.appendChild(div);
});

function submitQuiz() {
  let score = 0;
  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name=q${idx}]:checked`);
    if (selected) {
      if (selected.value === q.answer) {
        selected.parentElement.classList.add("correct");
        score++;
      } else {
        selected.parentElement.classList.add("incorrect");
        const correctOption = [...document.getElementsByName(`q${idx}`)].find(
          (opt) => opt.value === q.answer
        );
        if (correctOption) {
          correctOption.parentElement.classList.add("correct");
        }
      }
    }
  });
  document.getElementById("result").innerText = `You scored ${score} out of ${questions.length}`;
}
