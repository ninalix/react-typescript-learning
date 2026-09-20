import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';

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
          
          <Route path='/about' element={<AboutPage />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
    </>
    
  );
}

export default RouterExample