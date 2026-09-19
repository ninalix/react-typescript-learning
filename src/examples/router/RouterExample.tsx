import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';

export const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

function RouterExample() {
  return(
    <>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link  to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>

      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/users' element={<UsersPage />}/>
        <Route path='/users/:id' element={<UserDetailPage />}/>
        <Route path='*' element={<NotFoundPage />}/>
      </Routes>
    </>
    
  );
}

export default RouterExample