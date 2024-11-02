import React from 'react';
import { userSelector } from '../../features/auth';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(userSelector);
  return <div>Profile - {user.username}</div>;
};

export default Profile;
