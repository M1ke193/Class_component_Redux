import React from "react";

class ShouldUpdate extends React.Component {
  renderCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      field: "",
    };
    this.firstInput = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
        if(nextState.field === 5)
            return true;
        return false;
  }

  render() {
    this.renderCount++;
    return (
      <>
        <h3 className="title">shouldComponentUpdate</h3>
        <input
          ref={this.firstInput}
          type="text"
          className="todo-input"
          value={this.state.newTodo}
          placeholder="Value 5 will be render"
        />
        <button
          className="add-todo-button"
          onClick={() => {
            this.setState({ field: Number(this.firstInput.current.value) });
            console.log("value from state: ", this.state.field)
          }}
        >
          Add Todo
        </button>
        <p>Render Count: {this.renderCount}</p>
        <p>Field variable: {this.state.field}</p>
      </>
    );
  }
}

export default ShouldUpdate;
