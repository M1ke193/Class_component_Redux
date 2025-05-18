import React from 'react';
import { connect } from 'react-redux';
import { fetchUserAction } from '../actions/userApi';

class UserApiComp extends React.Component {
    render() {
        const { users, loading, error, fetchUser } = this.props;
        let content;

        if (loading) {
            content = <p style={{ color: 'blue', fontStyle: 'italic' }}>Please Wait...</p>;
        } else if (error) {
            content = <p style={{ color: 'red', fontStyle: 'italic' }}>Error: error.message</p>;
        } else if (users && users.length > 0) {
            content = (
                <ul className="todo-list">
                    {users.map((user) => (
                        <li style={{fontSize: '14px'}} key={user.id} className="todo-item">
                            <span>ID: {user.id}</span>
                            <span>User name: {user.username}</span>
                            <span>Email: {user.email}</span>
                            <span>Phone: {user.phone}</span>
                            <span>Address: {`${user.address.street} - ${user.address.city}`}</span>
                            <span>Company: {user.company.name}</span>
                            <span>Website: {user.website}</span>
                        </li>
                    ))}
                </ul>
            );
        } else {
            content = <p style={{ color: 'gray', fontStyle: 'italic' }}>User still not fetch</p>;
        }

        return (
            <div>
                <h2>User API with redux thunk</h2>
                {content}
                <button onClick={fetchUser} disabled={loading}>
                    {loading ? 'Loading...' : 'Fetch Users'}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state.userApi.users)
    return {
        users: state.userApi.users, 
        loading: state.userApi.loading,
        error: state.userApi.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(fetchUserAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserApiComp);