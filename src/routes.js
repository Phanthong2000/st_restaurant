import { Navigate, useRoutes } from 'react-router-dom';
import HomeLayout from './layouts/home';
import About from './pages/About';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Event from './pages/Event';
import Food from './pages/Food';
import FoodDetail from './pages/FoodDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderChooseFood from './pages/OrderChooseFood';
import Register from './pages/Register';
import Detail from './components/profile/Detail';
import HistoryOrder from './components/profile/HistoryOrder';
import ForgetPassword from './pages/ForgetPassword';
import Error from './pages/Error';

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
      path: '/forgot-password',
      element: <ForgetPassword />
    },
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        { path: '', element: <Navigate to="/home/app" /> },
        { path: 'app', element: <Home /> },
        { path: 'order', element: <Order /> },
        { path: 'food', element: <Food /> },
        { path: 'contact', element: <Contact /> },
        { path: 'about', element: <About /> },
        { path: 'food-detail/:id', element: <FoodDetail /> },
        { path: 'order-choose-food', element: <OrderChooseFood /> },
        {
          path: 'profile',
          element: <Profile />,
          children: [
            { path: 'detail', element: <Detail /> },
            { path: 'history-order', element: <HistoryOrder /> },
            { path: '', element: <Navigate to="/home/profile/detail" /> }
          ]
        }
      ]
    },
    { path: '/error', element: <Error /> },
    { path: '*', element: <Navigate to="/error" /> }
  ]);
}
