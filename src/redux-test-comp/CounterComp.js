import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions/counter';

class CounterComp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <p style={{ textAlign: 'center' }}>
                    Counter number form redux state: {this.props.countNumber}
                </p>
                <button
                    className="add-todo-button"
                    onClick={this.props.incrementNumber}
                >
                    Increment dispatch
                </button>
                <button
                    className="add-todo-button"
                    onClick={this.props.decrementNumber}
                >
                    Decrement dispatch
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countNumber: state.counter.count,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        incrementNumber: () => dispatch(increment()),
        decrementNumber: () => dispatch(decrement()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComp);
