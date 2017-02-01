//shuffle question order
export default function quizQuestionRamdomizer(quizData) {
  return shuffle(quizData);
}

function shuffle(array) {
	var a = array.slice();
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}