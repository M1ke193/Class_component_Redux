import "./App.css";
import React from "react";
import Child from "./child.js";
import PureComp from "./pure-comp-test/PureComp.js";
import NormalComp from "./pure-comp-test/NormalComp.js";
import ShouldUpdate from "./shouldUpdate.js";
import withLoadingIndicator from "./HOC/HOCLoading.js";
import UserProfile from "./HOC/Profile.js";

const UserProfileWithLoading = withLoadingIndicator(UserProfile);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      isHideChild: false,

      isLoading: true,
      userData: null,
    };
    this.removeTodoCB = this.removeTodoCB.bind(this);
  }

  removeTodoCB() {
    this.setState((prevState) => {
      const newTodos = [...prevState.todos];
      newTodos.pop();
      return { todos: newTodos };
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  componentDidMount() {
    // fetch simulate
    this.timerID = setTimeout(this.randomUser, 2000);
  }

  handleRefreshData = () => {
    this.setState({ isLoading: true, userData: null });
    this.timerID = setTimeout(this.randomUser, 2000);
  };

  toggleChild = () => {
    this.setState((prevState) => ({
      isHideChild: !prevState.isHideChild,
    }));
  };

  randomUser = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    this.setState({
      userData: {
        name: `Mike Nguyen ${randomNumber}`,
        email: `MikeNguyen${randomNumber}@gmail.com`,
      },
      isLoading: false,
    });
  };

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
        <button className="add-todo-button" onClick={this.toggleChild}>
          Toggle Child
        </button>

        {!this.state.isHideChild && (
          <Child
            todoQuantity={this.state.todos.length}
            removeTodoCB={this.removeTodoCB}
          />
        )}

        <hr />
        <PureComp />

        <hr />
        <NormalComp />

        <hr />
        <ShouldUpdate />

        <hr />
        <h4>USING HOC WITH LOADING</h4>
        <UserProfileWithLoading
          isLoading={this.state.isLoading}
          user={this.state.userData}
        />
        <h4>NOT USING HOC WITH LOADING</h4>
        <UserProfile
          user={this.state.userData}
        />
        <button className="add-todo-button" onClick={this.handleRefreshData}>
          Refresh Data
        </button>
      </div>
    );
  }
}

export default App;
