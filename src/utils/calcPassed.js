//determines if any quiz attempts by user passed
//compares attempt score to minimum passing score for quiz
export default function calcPassed(attempts, minScore) {
  let scores = attempts.reduce((result, attempt) => {
    if(typeof attempt !== "undefined")
      return result.concat(attempt.score);
    else
      return result;
  }, []);
  return Math.max(...scores) >= minScore ?
    true : false;
}
