import React from 'react';
import CounterComp from '../redux-test-comp/CounterComp';
import { connect } from 'react-redux';

class NormalComp extends React.Component {
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
        console.log('componentDidUpdate normal component');
    }

    render() {
        this.renderCount++;
        return (
            <>
                <h3 className="title">Normal Component Test</h3>

                <label>Input for primaryVar ( Will render )</label>
                <input
                    ref={this.firstInput}
                    type="number"
                    className="todo-input"
                    placeholder="Change primaryVar"
                />
                <button
                    className="add-todo-button"
                    onClick={() => {
                        this.setState({
                            primaryVar: Number(this.firstInput.current.value),
                        });
                    }}
                >
                    Change primaryVar
                </button>

                <label>Input for referenceVar ( Will render )</label>
                <input
                    ref={this.secondInput}
                    type="number"
                    className="todo-input"
                    placeholder="Change referenceVar"
                />
                <button
                    className="add-todo-button"
                    onClick={() => {
                        this.state.referenceVar.value = Number(
                            this.secondInput.current.value
                        );
                        this.setState({
                            referenceVar: this.state.referenceVar,
                        });
                    }}
                >
                    Change referenceVar
                </button>

                <label>Input for referenceVar ( Will render )</label>
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
                            referenceVar: {
                                ...prevState.referenceVar,
                                value: Number(this.thirdInput.current.value),
                            },
                        }));
                    }}
                >
                    Change whole referenceVar object
                </button>

                <p>Render Count: {this.renderCount}</p>
                <p>Primary variable: {this.state.primaryVar}</p>
                <p>Reference variable : {this.state.referenceVar.value}</p>

                <CounterComp />
                <p>
                    Profile user from redux state:{' '}
                    {this.props.profile.firstName
                        ? `${this.props.profile.firstName}-${this.props.profile.lastName}-${this.props.profile.birthdate}`
                        : 'Not set'}
                </p>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.user.profile,
    };
};

export default connect(mapStateToProps)(NormalComp);
