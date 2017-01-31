import React, {Component} from 'react';

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    let answerArray = this.props.answers.map((answer) => {
      return "none";
    });
    let currentSelected = answerArray.slice();
    this.props.idSelected ?
    currentSelected[this.props.idSelected] = "highlight" : ""
    console.log("props ", this.props);
    console.log("currentSelected: ", currentSelected);
    this.state = Object.assign({}, {answerClasses: currentSelected}, {reset: answerArray});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      console.log("new props:", this.props);
      let currentSelected = this.state.reset.slice();
      this.props.idSelected ?
      currentSelected[this.props.idSelected] = "highlight" : ""
      console.log("currentSelected: ", currentSelected);
      this.setState({answerClasses: currentSelected});
    }
  }

  click(event) {
    let id = event.target.id;
    let newState = this.state.reset.slice();
    newState[id] = "highlight";
    this.setState({answerClasses: newState});
    this.props.selectAnswer(event.target.textContent, event.target.id);
  }

  render() {
    let answers = this.props.answers.map((answer, index) => {
      return (
          <li className={this.state.answerClasses[index]} key={index} id={index} onClick={this.click.bind(this)}>{answer}</li>
        );
    });

    return (
      <div>{answers}</div>
    );
  }
}
