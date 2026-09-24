import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NewUserPage from './pages/NewUserPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';
import EditUserPage from './pages/EditUserPage';

function RouterExample() {
  return(
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />}/>

          <Route path='/users'>
            <Route index element={<UsersPage />}/>
            <Route path=':id' element={<UserDetailPage />}/>
          </Route>

          <Route path='/users/new' element={<NewUserPage />}/>
          <Route path='/users/:id/edit' element={<EditUserPage />}/>
          
          <Route path='/about' element={<AboutPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
    
  );
}

export default RouterExample