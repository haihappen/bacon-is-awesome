import Bacon, { Bus } from 'baconjs';
import React, { Component, PropTypes } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { text: new Bus() };
  }


  render() {
    return (
      <div>
        <TextInput text={this.state.text} />
        <Label text={this.state.text} />
        <InvertedLabel text={this.state.text} />
      </div>
    );
  }
}


class TextInput extends Component {
  static propTypes = {
    text: PropTypes.instanceOf(Bus).isRequired
  }


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  render() {
    return <input
              type="text"
              ref="input"
              value={this.state.text}
              onChange={()=>this.handleChange()}
            />;
  }


  handleChange() {
    let text = React.findDOMNode(this.refs.input).value;

    this.setState({ text });
    this.props.text.push(text);
  }
}


class Label extends React.Component {
  static propTypes = {
    text: PropTypes.instanceOf(Bus).isRequired
  }


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  componentWillMount() {
    this.props.text.toProperty('').onValue((text) => {
      this.setState({ text });
    });
  }


  render() {
    return <p>{this.state.text}</p>;
  }
}


class InvertedLabel extends Label {
  static propTypes = {
    text: PropTypes.instanceOf(Bus).isRequired
  }


  componentWillMount() {
    let reverse = (string) => string.split('').reverse().join('');

    this.props.text.map(reverse).toProperty('').onValue((text) => {
      this.setState({ text });
    });
  }
}


React.render(<App />, document.body);
