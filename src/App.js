import "./App.css";
import React from "react";
import Child from "./child.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      isHideChild: false,
    };
    this.removeTodoCB = this.removeTodoCB.bind(this);
  }

  removeTodoCB (){
    this.setState((prevState) => {
      const newTodos = [...prevState.todos];
      newTodos.pop();
      return { todos: newTodos };
    });
  };

  toggleChild = () => {
    this.setState((prevState) => ({
      isHideChild: !prevState.isHideChild
    }));
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
                <button
          className="add-todo-button"
          onClick={this.toggleChild}
        >
          Toggle Child
        </button>
        {!this.state.isHideChild && (
          <Child
            todoQuantity={this.state.todos.length}
            removeTodoCB={this.removeTodoCB}
          />
        )} 
      </div>
    );
  }
}

export default App;
