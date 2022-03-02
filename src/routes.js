import { Navigate, useRoutes } from 'react-router-dom';
import HomeLayout from './layouts/home/HomeLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        { path: '', element: <Navigate to="/home/app" /> },
        { path: 'app', element: <Home /> }
      ]
    }
  ]);
}
