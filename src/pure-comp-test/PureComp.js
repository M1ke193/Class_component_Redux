import React from "react";

class PureComp extends React.PureComponent {
  renderCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      primaryVar: 0,
      referenceVar: {
        value: 0,
      },
    };
    this.firstInput = React.createRef();
    this.secondInput = React.createRef();
    this.thirdInput = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate pure component");
  }

  render() {
    this.renderCount++;
    return (
      <>
        <h3 className="title">Pure Component Test</h3>

        <label>Input for primaryVar (Render when value change)</label>
        <input
          ref={this.firstInput}
          type="number"
          className="todo-input"
          placeholder="Change primaryVar"
        />
        <button
          className="add-todo-button"
          onClick={() => {
            this.setState({ primaryVar: Number(this.firstInput.current.value) })
          }}
        >
          Change primaryVar
        </button>

        <label>Input for referenceVar (No render when value change, but ref not change)</label>
        <input
          ref={this.secondInput}
          type="number"
          className="todo-input"
          placeholder="Change referenceVar"
        />
        <button
          className="add-todo-button"
          onClick={() => {
            this.state.referenceVar.value = Number(this.secondInput.current.value);
            this.setState({
              referenceVar: this.state.referenceVar,
            });
            console.log("Value has been change but UI not render:", this.state.referenceVar);
          }}
        >
          Change referenceVar
        </button>

        <label>Input for referenceVar (Render when value change, also ref change)</label>
        <input
          ref={this.thirdInput}
          type="number"
          className="todo-input"
          placeholder="Change whole referenceVar object"
        />
        <button
          className="add-todo-button"
          onClick={() => {
             this.setState((prevState) => ({
              referenceVar: { ...prevState.referenceVar, value: Number(this.thirdInput.current.value) },
            }));
            console.log("Value has been change and also render:", this.state.referenceVar);
          }}
        >
          Change whole referenceVar object
        </button>

        <p>Render Count: {this.renderCount}</p>
        <p>Primary variable: {this.state.primaryVar}</p>
        <p>Reference variable : {this.state.referenceVar.value}</p>
      </>
    );
  }
}

export default PureComp;
