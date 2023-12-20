import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userPostsCount, setUserPostsCount] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPostsCount = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const postsCount = response.data.reduce((acc, post) => {
        acc[post.userId] = (acc[post.userId] || 0) + 1;
        return acc;
      }, {});
      setUserPostsCount(postsCount);
    };

    fetchPostsCount();
  }, []);

  return (
    <div className='container'>
      <h2>Directory</h2>
      <ul className='userUl'>
        {users.map(user => (
          <Link className='userList' to={`/user/${user?.id}`}key={user?.id}>
            <div className='listItem' to={`/user/${user?.id}`}>{`Name: ${user?.name}`}</div>
            <div className='listItem' to={`/user/${user?.id}`}>{`Posts: ${userPostsCount[user.id] || 0}`}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
