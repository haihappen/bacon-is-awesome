import Bacon, { Bus } from 'baconjs';
import React, { Component, PropTypes } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stream: new Bus() };
  }


  render() {
    var text = "Hallo";

    return (
      <div>
        <TextInput stream={this.state.stream} />
        <Label stream={this.state.stream} />
        <InvertedLabel stream={this.state.stream} />
      </div>
    );
  }
}


class TextInput extends Component {
  static propTypes = {
    stream: PropTypes.instanceOf(Bus).isRequired
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
    this.props.stream.push(text);
  }
}


class Label extends React.Component {
  static propTypes = {
    stream: PropTypes.instanceOf(Bus).isRequired
  }


  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  componentWillMount() {
    this.props.stream.toProperty('').onValue((text) => {
      this.setState({ text });
    });
  }


  render() {
    return <p>{this.state.text}</p>;
  }
}


class InvertedLabel extends Label {
  static propTypes = {
    stream: PropTypes.instanceOf(Bus).isRequired
  }


  componentWillMount() {
    let reverse = (string) => string.split('').reverse().join('');

    this.props.stream.map(reverse).toProperty('').onValue((text) => {
      this.setState({ text });
    });
  }
}


React.render(<App />, document.body);
