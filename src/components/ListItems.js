import React, {Component} from 'react';

export default class ListItems extends Component {
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

  componentWillUpdate(nextProps, nextState) {
    if(this.props != nextProps) {
      let currentSelected = this.state.reset.slice();
      currentSelected[nextProps.itemSelected] = "highlight"
      this.setState({answerClasses: currentSelected});
    }
  }

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
