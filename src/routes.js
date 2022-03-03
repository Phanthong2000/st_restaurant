import { Navigate, useRoutes } from 'react-router-dom';
import HomeLayout from './layouts/home';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Event from './pages/Event';
import Food from './pages/Food';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import Register from './pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />
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
        { path: 'app', element: <Home /> },
        { path: 'order', element: <Order /> },
        { path: 'food', element: <Food /> },
        { path: 'event', element: <Event /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'cart', element: <Cart /> }
      ]
    }
  ]);
}
