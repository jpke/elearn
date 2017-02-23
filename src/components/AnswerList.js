import React, {Component} from 'react';

//stateful component which creates list of answer choices for quiz question
//assigns "highlight" to a selected answer, allowing CSS to highlight this choice
//updates highlighted answer when another answer choice is selected
//calls selectAnswer action when list item is clicked
export default class AnswerList extends Component {
  //constructs initial state, creating an answerArray mapped to the answers listed for the question
  //if itemSelected is present, the corresponding answer choice receives "highlight" class
  constructor(props) {
    super(props);
    let answerArray = this.props.answers.map(() => {
      return "none";
    });
    let currentSelected = answerArray.slice();
    this.props.idSelected ?
    currentSelected[this.props.itemSelected] = "highlight" : ""
    this.state = Object.assign({}, {answerClasses: currentSelected}, {reset: answerArray});
  }
  //prop updates will update current answer selected with "highlight" class
  componentWillUpdate(nextProps) {
    if(this.props != nextProps) {
      let currentSelected = this.state.reset.slice();
      currentSelected[nextProps.itemSelected] = "highlight"
      this.setState({answerClasses: currentSelected});
    }
  }
  //user click on answer choice will call this function, which sends item data into selectAnswer action
  click(event, index) {
    this.props.selectAnswer(event.target.textContent, event.target.id, index);
  }

  render() {
    let answers = this.props.answers.map((answer, index) => {
      return (
          <li className={this.state.answerClasses[index]} key={index} id={answer._id} onClick={(event) => this.click(event, index)}>{answer.answer}</li>
        );
    });

    return (
      <div>{answers}</div>
    );
  }
}
