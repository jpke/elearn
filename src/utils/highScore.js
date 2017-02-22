//finds highest score achieved out of all quiz attempts made by user
export default function highScore(attempts) {
  let highScore = 0;
  attempts.forEach((attempt) => {
    if(typeof attempt !== "undefined") {
      if(attempt.score > highScore) highScore = attempt.score;
    }
  });
  return highScore;
}
