//data to seed edit quiz template for new quiz
const seedItem = {
  title: "new quiz",
  courses: ["undefined"],
  items: [{
    question: "enter question here",
    answers: [
      {
        answer: "enter answer here",
        correct: true
      },
      {
        answer: "enter answer here",
        correct: false
      },
      {
        answer: "enter answer here",
        correct: false
      },
      {
        answer: "enter answer here",
        correct: false
      }
    ]
  }],
  minimumScore: 0,
  live: false
};

export default seedItem;
