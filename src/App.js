import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
    };
  }
  render() {
    return (
      <div className="App">
        <h1 className="title">To Do List</h1>
        <ul className="todo-list">
          {this.state.todos.map((todo, index) => (
            <li key={index} className="todo-item">
              {todo}
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="todo-input"
          value={this.state.newTodo}
          onChange={(e) => this.setState({ newTodo: e.target.value })}
          placeholder="Add a new todo"
        />
        <button
          className="add-todo-button"
          onClick={() => {
            if (this.state.newTodo.trim() !== "") {
              this.setState((prevState) => ({
                todos: [...prevState.todos, prevState.newTodo],
                newTodo: "",
              }));
            }
          }}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

export default App;
