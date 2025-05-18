import React from 'react';
import { connect } from 'react-redux';
import { deleteUser, setUser } from '../actions/userAction';

class UserComp extends React.Component {
    constructor(props) {
        super(props);
        this.firestNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.birthdateRef = React.createRef();
    }

    addUser = () => {
        const firstName = this.firestNameRef.current.value;
        const lastName = this.lastNameRef.current.value;
        const birthdate = this.birthdateRef.current.value;

        if (firstName && lastName && birthdate) {
            this.props.setUser({
                profile: {
                    firstName,
                    lastName,
                    birthdate,
                },
            });
        } else {
            alert('Please fill all fields');
        }
    };

    removeUser = () => {
        this.firestNameRef.current.value = '';
        this.lastNameRef.current.value = '';
        this.birthdateRef.current.value = '';
        this.props.deleteUser();
    }

    render() {
        return (
            <>
                <h2> Set User for redux state</h2>
                <input
                    ref={this.firestNameRef}
                    type="text"
                    className="todo-input"
                    placeholder="User First Name"
                />
                <input
                    ref={this.lastNameRef}
                    type="text"
                    className="todo-input"
                    placeholder="User Last Name"
                />

                <input
                    ref={this.birthdateRef}
                    type="text"
                    className="todo-input"
                    placeholder="User Birthdate"
                />

                <button
                    className="add-todo-button"
                    onClick={this.addUser}
                >
                    Add User
                </button>

                <button
                    className="add-todo-button"
                    onClick={this.removeUser}
                >
                    Delete User
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.user.profile,
    };
};

const mapDispatchToProps = {
    setUser,
    deleteUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComp);
