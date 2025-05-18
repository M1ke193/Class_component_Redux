import React from "react";

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tick: 0,
      updateValue: this.props.todoQuantity,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      console.log("Tick!");
      this.setState((prevState) => ({
        tick: prevState.tick + 1,
      }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.todoQuantity !== this.props.todoQuantity) {
      this.setState({
        updateValue: prevState.updateValue + 2,
      });
    }
  }

  render() {
    return (
      <>
        <h3 className="title">Child Component</h3>
        <h2>{`TODO LENGTH: ${this.props.todoQuantity}`}</h2>
        <button className="add-todo-button" onClick={this.props.removeTodoCB}>
          Remove Todo
        </button>
        <p>Invterval Tick from componentDidMount: {this.state.tick}</p>
        <p>
          When componentDidUpdate ( Value = Todos lengh + 2): {this.state.updateValue}
        </p>
      </>
    );
  }
}

export default Child;
