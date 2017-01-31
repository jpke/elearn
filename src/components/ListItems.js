import React, {Component} from 'react';

export default class ListItems extends Component {
  constructor(props) {
    super(props);
    let answerArray = this.props.answers.map((answer, index) => {
      return "none";
    });
    this.state = Object.assign({}, {answerClasses: answerArray}, {reset: answerArray});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({answerClasses: this.state.reset});
    }
  }

  click(event) {
    let id = event.target.id;
    let newState = this.state.reset.slice();
    newState[id] = "highlight";
    this.setState({answerClasses: newState});
    this.props.selectAnswer(event.target.textContent);
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
