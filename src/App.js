import "./App.css";
import React from "react";
import Child from "./child.js";
import PureComp from "./pure-comp-test/PureComp.js";
import NormalComp from "./pure-comp-test/NormalComp.js";
import ShouldUpdate from "./shouldUpdate.js";
import withLoadingIndicator from "./HOC/HOCLoading.js";
import UserProfile from "./HOC/Profile.js";
import CounterComp from "./redux-test-comp/CounterComp.js";
import UserComp from "./redux-test-comp/UserComp.js";
import { connect } from "react-redux";
import UserApiComp from "./redux-test-comp/userApiComp.js";

const UserProfileWithLoading = withLoadingIndicator(UserProfile);
class App extends React.Component {
  renderCount = 0;
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      isHideChild: false,

      isLoading: true,
      userData: null,
    };
    this.forwordRef = React.createRef();
    this.removeTodoCB = this.removeTodoCB.bind(this);
  }

  removeTodoCB() {
    this.setState((prevState) => {
      const newTodos = [...prevState.todos];
      newTodos.pop();
      return { todos: newTodos };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("component App did update");
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

  handleChangeColor = () => {
    if (this.forwordRef.current) {
      this.forwordRef.current.changeColor();
    }
  };

  render() {
    this.renderCount++;
    return (
      <div className="App">

        {/* component set user from redux state */}
        <UserComp />
        <hr />





        {/* nomral component with todo list */}
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
          Toggle Child (clear interval, when componentWillUnmount)
        </button>
        {!this.state.isHideChild && (
          <Child
            todoQuantity={this.state.todos.length}
            removeTodoCB={this.removeTodoCB}
          />
        )}
        <CounterComp />
        <p>Render Count: {this.renderCount}</p>
        <p>firstName user from redux state: {this.props.firstName ?? "Not set"}</p>





        {/* comparison between pure component and normal component */}
        <hr />
        <PureComp />
        <hr />
        <NormalComp />





        {/* component using life cycle shouldupdate */}
        <hr />
        <ShouldUpdate />





        {/* component using HOC */}
        <hr />
        <h4>This is form Parent component</h4>
        <button
          className="add-todo-button"
          onClick={this.handleChangeColor}
        >
          Change color component wrapped by HOC (forwardRef)
        </button>
        <h4>USING HOC WITH LOADING</h4>
        <UserProfileWithLoading
          ref={this.forwordRef}
          isLoading={this.state.isLoading}
          user={this.state.userData}
        />
        <h4>NOT USING HOC WITH LOADING</h4>
        <UserProfile user={this.state.userData} />
        <button className="add-todo-button" onClick={this.handleRefreshData}>
          Refresh Data
        </button>





      {/* component using redux thunk */}
        <UserApiComp/>
        <hr />




        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.user.profile.firstName,
  }
}

export default connect(mapStateToProps)(App);
