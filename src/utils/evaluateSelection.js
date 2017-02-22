//determines if selected answer is correct
//returns boolean value
export default function evaluateSelection(answerSelected, currentQuestion) {
  function findAnswer(id, answers) {
    return answers.filter((answer) => {
      return answer._id === id
    })
  }
  const answer = findAnswer(answerSelected, currentQuestion.answers)[0]
  return answer.correct ? true : false
}
