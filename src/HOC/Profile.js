// src/UserProfile.js
import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props; 

    return (
      <div style={{ border: '1px solid green', padding: '10px', marginTop: '10px' }}>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    );
  }
}

UserProfile.displayName = 'UserProfile';
export default UserProfile;